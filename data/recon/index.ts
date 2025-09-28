import { finalreconTool } from './finalrecon';
import { reconspiderTool } from './reconspider';
import { whoisTool } from './whois';
import { digTool } from './dig';
import { reconWaf } from './waf/index';

import type { Tools } from '~~/types/tools';

export const recon: Tools = {
  finalrecon: finalreconTool,
  reconspider: reconspiderTool,
  whois: whoisTool,
  dig: digTool,
  waf: reconWaf,
};