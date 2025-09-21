import { enumeration } from './enumeration/index';
import { recon } from './recon/index';
// Nantinya, impor kategori lain di sini
// import { allFuzzingTools } from '~/data/fuzzing';

// Ini adalah "variable array" yang Anda inginkan
export const toolCategories = [
  {
    name: 'Reconnaissance', // Nama yang akan ditampilkan sebagai judul
    basePath: '/recon',    // Path dasar untuk URL
    data: recon,   // Objek data dari index kategori
  },
  {
    name: 'Enumeration',
    basePath: '/enumeration',
    data: enumeration,
  },
  // ... tambahkan objek untuk kategori baru di sini
];