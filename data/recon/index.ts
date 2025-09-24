import { finalreconTool } from './finalrecon';
import { reconspiderTool } from './reconspider';
import { wafw00fTool } from './wafw00f';
import { whoisTool } from './whois';
import { digTool } from './dig';

import type { Tools } from '../../types/tools';

export const recon: Tools = {
  finalrecon: finalreconTool,
  reconspider: reconspiderTool,
  wafw00f: wafw00fTool,
  whois: whoisTool,
  dig: digTool,
};