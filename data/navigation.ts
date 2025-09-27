import type { NavLink } from '../types/navlink';

export const navStructure: NavLink[] = [
  {
    name: 'Reconnaissance',
    path: '/recon', 
    children: [
      { name: 'Dig', path: '/recon/dig' },
      {
        name: 'DNS',
        path: '/recon/dns', 
        children: [
          { name: 'Tool 1', path: '/recon/dns/tool1' },
          { name: 'Tool 2', path: '/recon/dns/tool2' },
        ]
      },
      {
        name: 'Test', 
        path: '/recon/test',
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
  {
    name: 'Linux',
    path: '/linux',
  },
];