import { enumeration } from './enumeration/index';
import { recon } from './recon/index';


export const toolCategories = [
  {
    name: 'Reconnaissance',
    basePath: '/recon',   
    data: recon,
  },
  {
    name: 'Enumeration',
    basePath: '/enumeration',
    data: enumeration,
  },
];