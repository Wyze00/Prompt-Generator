import type { ITool } from '../../types/interfaces';

export const pwdTool: ITool = {
  "name": "pwd",
  "description": "Print current working directory",
  "documentation": {
    "overview": "Print current working directory",
    "installation": "sudo apt install coreutils",
    "usage": [
      {
        "mode": "DEFAULT ()",
        "text": "pwd",
        "options": ""
      }
    ]
  },
  "command": [
    {
      "name": "pwd",
      "mode": "DEFAULT",
      "description": "",
      "groups": []
    }
  ],
  "relatedTools": []
};