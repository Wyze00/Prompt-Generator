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
// FUNGSI-FUNGSI PARSER
// ====================================================================

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
 * [BARU & DIPERBAIKI] Fungsi ini sekarang mem-parsing satu komponen menjadi satu IGroup.
 * Ia bisa menangani komponen dengan atau tanpa kurung terluar.
 */
function parseComponentToGroup(component) {
  let processed = component.trim();

  const isOptional = processed.startsWith('[') && processed.endsWith(']');
  const isRequired = processed.startsWith('{') && processed.endsWith('}');
  
  // Ambil konten di dalam kurung jika ada, jika tidak, gunakan seluruh string
  const content = (isOptional || isRequired) ? processed.slice(1, -1) : processed;
  const isOneOf = splitTopLevel(content, '|').length > 1;

  let type = 'required'; // Default untuk komponen tanpa kurung seperti `<tools>`
  if (isOneOf && isRequired) type = 'required_one_of';
  else if (isOneOf && isOptional) type = 'optional_one_of';
  else if (isRequired) type = 'required';
  else if (isOptional) type = 'optional';
  
  const flagParts = splitTopLevel(content, '|');

  const flags = flagParts.map(part => {
    let currentPart = part.trim();
    let nestedOptions = [];
    const nestedMatch = currentPart.match(/(\[.*?\]|\{.*?\})$/);
    if (nestedMatch) {
      const nestedString = nestedMatch[0];
      currentPart = currentPart.replace(nestedString, '').trim();
      // Panggilan Rekursif: ubah nested string menjadi IGroup
      nestedOptions.push(parseComponentToGroup(nestedString));
    }
    let description = '';
    const descMatch = currentPart.match(/\((.*?)\)/);
    if (descMatch) {
      description = descMatch[1];
      currentPart = currentPart.replace(/\s*\((.*?)\)/, '').trim();
    }
    const hasInput = currentPart.includes('<') && currentPart.includes('>');
    return { flag: currentPart, description, input: hasInput, options: nestedOptions };
  });

  return { type, description: '', flags };
}

/**
 * Fungsi parser untuk USAGE yang lebih toleran terhadap spasi.
 */
function parseUsage(usageText) {
  if (!usageText || !usageText.trim()) return [];
  
  const modeBlocks = usageText.split(/\n?###\s*/).filter(block => block.trim() !== '');

  return modeBlocks.map(block => {
    const lines = block.trim().split('\n');
    const headerLine = lines.shift().trim();

    let mode = headerLine;
    let description = '';
    
    // Gunakan regex untuk mengekstrak MODE dan DESKRIPSI dari header
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
    } else if (!text && content) {
      options = content;
    }
    
    return {
      mode: headerLine,                // Untuk `command.mode`
      text: text,                // Untuk `command.name` & `documentation.usage.text`
      options: options.replaceAll('  ', ''),
    };
  });
}

/**
 * Mem-parsing konten pesan Discord utama menjadi beberapa bagian.
 */
function parseContent(content) {
  const overviewMatch = content.match(/## OVERVIEW\s*([\s\S]*?)(?=\s*## INSTLATION)/);
  const installationMatch = content.match(/## INSTLATION\s*```bash\s*([\s\S]*?)\s*```/);
  const usageMatch = content.match(/## USAGE\s*([\s\S]*)/);
  return {
    overview: overviewMatch ? overviewMatch[1].trim() : '',
    installation: installationMatch ? installationMatch[1].trim() : '',
    usage: usageMatch ? parseUsage(usageMatch[1]) : [],
  };
}

// ====================================================================
// FUNGSI UTAMA (MAIN)
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
        const groups = lines.flatMap(line => {
            let currentLine = line.trim().substring(1).trim();
            
            // Jika baris dibungkus kurung kurawal, proses isinya saja
            if (currentLine.startsWith('{') && currentLine.endsWith('}')) {
              currentLine = currentLine.slice(1, -1).trim();
            }

            // Regex untuk menemukan semua komponen level atas: [...], {...}, atau <...> (deskripsi)
            const components = currentLine.match(/(\[.*?\]|\{.*?\}|<.*?>\s*\(.*?\))/g) || [];
            console.log(components);
            // Ubah setiap komponen yang ditemukan menjadi IGroup
            return components.map(component => parseComponentToGroup(component));
        });
        
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
    };
    const fileContent = `
import type { ITool } from '../../types/interfaces';

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