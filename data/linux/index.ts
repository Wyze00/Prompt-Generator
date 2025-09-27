import { treeTool } from './tree';
import { cdTool } from './cd';
import { pwdTool } from './pwd';
import { infoTool } from './info';
import { whichTool } from './which';
import { updatedbTool } from './updatedb';
import { aptfileTool } from './apt-file';
import { locateTool } from './locate';
import { whereisTool } from './whereis';
import { dpkgTool } from './dpkg';
import { whatisTool } from './whatis';
import { aproposTool } from './apropos';
import { templateTool } from './template';
import { manTool } from './man';
import { sudoTool } from './sudo';

export const linux = {
  tree: treeTool,
  cd: cdTool,
  pwd: pwdTool,
  info: infoTool,
  which: whichTool,
  updatedb: updatedbTool,
  aptfile: aptfileTool,
  locate: locateTool,
  whereis: whereisTool,
  dpkg: dpkgTool,
  whatis: whatisTool,
  apropos: aproposTool,
  template: templateTool,
  man: manTool,
  sudo: sudoTool,
};