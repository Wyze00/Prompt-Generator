export interface NavLink {
  name: string;
  path: string;
  children?: NavLink[]; // Children bersifat opsional, untuk item yang punya submenu
}

export const navStructure: NavLink[] = [
  {
    name: 'Reconnaissance',
    path: '/recon', // Halaman index untuk kategori Recon
    children: [
      { name: 'Dig', path: '/recon/dig' },
      {
        name: 'DNS', // Ini adalah sub-kategori
        path: '/recon/dns', // Halaman index untuk sub-kategori DNS
        children: [
          { name: 'Tool 1', path: '/recon/dns/tool1' },
          { name: 'Tool 2', path: '/recon/dns/tool2' },
        ]
      },
      {
        name: 'Test', // Ini adalah sub-kategori
        path: '/recon/test', // Halaman index untuk sub-kategori DNS
        children: [
          { name: 'Tool 3', path: '/recon/dns/tool1' },
          { name: 'Tool 4', path: '/recon/dns/tool2' },
        ]
      }
    ]
  },
  {
    name: 'Enumeration',
    path: '/enumeration',
    children: [
      { name: 'Gobuster', path: '/enumeration/gobuster' },
    ]
  },
  // ... Tambahkan kategori utama lainnya di sini
];