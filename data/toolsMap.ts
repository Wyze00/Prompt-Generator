import { toolCategories } from '~~/data/tools';

// Membuat sebuah objek pemetaan dari 'nama-tool' ke 'path/lengkap'
// Contoh: { dig: '/recon/dig', gobuster: '/enumeration/gobuster' }
export const toolMap: Record<string, string> = {};

function populateMap(data: Record<string, any>, basePath: string) {
  for (const key in data) {
    const item = data[key];
    const currentPath = `${basePath}/${key}`;

    // Cek apakah item adalah tool (bukan sub-kategori)
    if (item && typeof item === 'object' && 'command' in item) {
      toolMap[key] = currentPath;
    } else if (item && typeof item === 'object') {
      // Jika ini adalah sub-kategori, panggil fungsi ini lagi (rekursif)
      populateMap(item, currentPath);
    }
  }
}

// Loop melalui kategori utama dan isi peta kita
toolCategories.forEach(category => {
  populateMap(category.data, category.basePath);
});