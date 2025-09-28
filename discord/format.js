import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

// --- KONFIGURASI ---
const CHANNEL_NAME = process.argv[2];
if (!CHANNEL_NAME) {
  console.error('Error: Harap tentukan kategori (contoh: node format.js recon)');
  process.exit(1);
}

const INPUT_FILE = `./discord/fetchOutput/${CHANNEL_NAME}.json`; // Path ke file JSON dari Discord
const OUTPUT_DIR = `./data/${CHANNEL_NAME}`; // Folder untuk menyimpan hasil

// ====================================================================
// FUNGSI-FUNGSI PARSER (BARU & DIPERBAIKI)
// ====================================================================

/**
 * Memisahkan string berdasarkan delimiter di level teratas, mengabaikan
 * delimiter yang ada di dalam kurung {...} atau [...].
 */
function splitTopLevel(str, delimiter) {
  const result = [];
  let braceCount = 0;
  let lastSplit = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '{' || str[i] === '[') braceCount++;
    if (str[i] === '}' || str[i] === ']') braceCount--;
    if (str[i] === delimiter && braceCount === 0) {
      result.push(str.substring(lastSplit, i));
      lastSplit = i + 1;
    }
  }
  result.push(str.substring(lastSplit));
  return result.map(s => s.trim());
}

/**
 * Menemukan semua komponen bersarang level atas (e.g., {...} atau [...])
 * dalam sebuah string.
 */
function findTopLevelComponents(str) {
    const components = [];
    let level = 0;
    let start = -1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '{' || str[i] === '[') {
            if (level === 0) {
                start = i;
            }
            level++;
        } else if (str[i] === '}' || str[i] === ']') {
            if (level > 0) {
                level--;
                if (level === 0 && start !== -1) {
                    components.push(str.substring(start, i + 1));
                    start = -1;
                }
            }
        }
    }
    return components;
}

/**
 * [Fungsi Parser Rekursif] Mengubah string komponen menjadi struktur IGroup.
 * Fungsi ini menggantikan `_parseSingleComponentToGroup`.
 */
function parseComponentToGroup(componentStr) {
    let processed = componentStr.trim();

    const isOptional = processed.startsWith('[') && processed.endsWith(']');
    const isRequired = processed.startsWith('{') && processed.endsWith('}');
    const content = (isOptional || isRequired) ? processed.slice(1, -1).trim() : processed;

    const flagParts = splitTopLevel(content, '|');
    const isOneOf = flagParts.length > 1;

    let type;
    if (isOneOf && isRequired) type = 'required_one_of';
    else if (isOneOf && isOptional) type = 'optional_one_of';
    else if (isRequired) type = 'required';
    else if (isOptional) type = 'optional';
    else type = 'required'; // Default untuk input yang tidak dibungkus kurung

    const flags = flagParts.map(partStr => {
        let currentPart = partStr.trim();
        const nestedComponentStrings = findTopLevelComponents(currentPart);

        let mainPart = currentPart;
        // Hapus semua komponen turunan dari string untuk mengisolasi bagian utama
        nestedComponentStrings.forEach(comp => {
            mainPart = mainPart.replace(comp, '').trim();
        });

        let actualNestedComponents = nestedComponentStrings;
        
        // Menangani kasus di mana komponen pertama sebenarnya adalah bagian utama
        // e.g., `{{-rf} -rfi <rfi>}`
        if (mainPart === '' && nestedComponentStrings.length > 0) {
            mainPart = nestedComponentStrings[0];
            actualNestedComponents = nestedComponentStrings.slice(1);
        }

        const nestedOptions = actualNestedComponents.map(comp => parseComponentToGroup(comp));
        
        let description = '';
        // Regex untuk mencocokkan deskripsi dalam kurung di akhir string
        const descMatch = mainPart.match(/\s*\(([^)]*)\)$/);
        if (descMatch) {
            description = descMatch[1].trim();
            mainPart = mainPart.replace(descMatch[0], '').trim();
        }
        
        const hasInput = /<.*?>/.test(mainPart);

        return {
            flag: mainPart,
            description,
            input: hasInput,
            options: nestedOptions,
        };
    });

    return { type, description: '', flags };
}

/**
 * [Fungsi Pengganti] Fungsi utama untuk mem-parsing satu baris dari file markdown.
 * Fungsi ini menggantikan `parseLineToGroups`.
 */
function parseLine(line) {
    let content = line.trim();
    if (content.startsWith('-')) {
        content = content.substring(1).trim();
    }
    // Memastikan semua komponen diproses sebagai grup dengan memanggil parser rekursif
    return parseComponentToGroup(content);
}

function parseUsage(usageText) {
  if (!usageText || !usageText.trim()) return [];
  
  const modeBlocks = usageText.split(/\n?###\s*/).filter(block => block.trim() !== '');

  return modeBlocks.map(block => {
    const lines = block.trim().split('\n');
    const headerLine = lines.shift().trim();

    let mode = headerLine;
    let description = '';
    
    const headerMatch = headerLine.match(/^(.+?)\s*\((.*?)\)$/);
    if (headerMatch) {
      mode = headerMatch[1].trim();
      description = headerMatch[2].trim();
    }
    
    const content = lines.join('\n').trim();
    const textMatch = content.match(/-\s*\*\*(.*?)\*\*/);
    const text = textMatch ? textMatch[1].trim() : '';
    
    let options = '';
    if (textMatch && textMatch.index !== undefined) {
      const textLineEndIndex = textMatch.index + textMatch[0].length;
      options = content.substring(textLineEndIndex).trim();
    } else if (!text) {
      options = content;
    }
    
    return {
      mode: headerLine,               
      text: text,                
      options: options.replaceAll('  ', ''),
    };
  });
}

function parseContent(content) {
  const overviewMatch = content.match(/## OVERVIEW\s*([\s\S]*?)(?=\s*## INSTLATION)/);
  const installationMatch = content.match(/## INSTLATION\s*```bash\s*([\s\S]*?)\s*```/);
  const usageMatch = content.match(/## USAGE\s*([\s\S]*?)(?=\n## |\s*$)/);
  const linksMatch = content.match(/## LINKS\s*([\s\S]*)/);
  let relatedTools = [];

  if (linksMatch && linksMatch[1]) {
      relatedTools = linksMatch[1]
          .split('\n') 
          .map(line => line.trim()) 
          .filter(line => line.startsWith('- ')) 
          .map(line => line.substring(2).trim());
  }

  return {
    overview: overviewMatch ? overviewMatch[1].trim() : '',
    installation: installationMatch ? installationMatch[1].trim() : '',
    usage: usageMatch ? parseUsage(usageMatch[1]) : [],
    relatedTools: relatedTools
  };
}

// ====================================================================
// FUNGSI UTAMA (MAIN) - Dengan sedikit modifikasi
// ====================================================================
function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Folder output dibuat: ${OUTPUT_DIR}`);
  }
  let inputData;
  try {
    inputData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
    console.log(`Membaca ${Object.keys(inputData).length} tools dari ${INPUT_FILE}`);
  } catch (error) {
    console.error(`Gagal membaca atau mem-parsing file input: ${INPUT_FILE}`, error);
    return;
  }
  const allGeneratedTools = [];
  for (const toolName in inputData) {
    const messages = inputData[toolName];
    if (!messages || messages.length === 0) continue;
    const content = messages[0].content;
    const docData = parseContent(content);
    const commands = docData.usage.map(usageCmd => {
        const lines = usageCmd.options.split('\n').filter(l => l.trim() !== '' && l.trim().startsWith('-'));
      
        // --- MODIFIKASI INTI ---
        // Menggunakan fungsi `parseLine` yang baru
        const groups = lines.map(line => parseLine(line));

        const mode = usageCmd.mode;
        const realMode = mode.match(/[A-Za-z]*/)[0];
        const description = mode.match(/\(([A-Za-z0-9 ]*)\)/);
        return { name: usageCmd.text, mode: realMode, description: description ? description[1] : '', groups: groups};
    });
    const toolObject = {
      name: toolName,
      description: docData.overview,
      documentation: {
        overview: docData.overview,
        installation: docData.installation,
        usage: docData.usage,
      },
      command: commands,
      relatedTools: docData.relatedTools
    };
    const fileContent = `
import type { ITool } from '~~/types/interfaces';

export const ${toolName}Tool: ITool = ${JSON.stringify(toolObject, null, 2)};
    `;
    const outputPath = path.join(OUTPUT_DIR, `${toolName}.ts`);
    fs.writeFileSync(outputPath, fileContent.trim());
    console.log(`-> Berhasil membuat file: ${outputPath}`);
    allGeneratedTools.push(toolName);
  }
  if (allGeneratedTools.length > 0) {
    let indexContent = '';
    allGeneratedTools.forEach(toolName => {
        indexContent += `import { ${toolName}Tool } from './${toolName}';\n`;
    });
    indexContent += `\nexport const ${CHANNEL_NAME} = {\n`;
    allGeneratedTools.forEach(toolName => {
        indexContent += `  ${toolName}: ${toolName}Tool,\n`;
    });
    indexContent += '};';
    const indexOutputPath = path.join(OUTPUT_DIR, 'index.ts');
    fs.writeFileSync(indexOutputPath, indexContent);
    console.log(`-> Berhasil membuat file index: ${indexOutputPath}`);
  }
  console.log('\nProses selesai!');
}

main();