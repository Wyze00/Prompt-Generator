import { enumeration } from './enumeration/index';
import { recon } from './recon/index';
import { linux } from './linux/index';

import type { Categories } from '../types/tools'

export const toolCategories: Categories[] = [
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
  {
    name: 'Linux',
    basePath: '/linux',
    data: linux,
  }
];