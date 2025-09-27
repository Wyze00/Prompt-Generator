import type { ITool } from '../../types/interfaces';

export const updatedbTool: ITool = {
  "name": "updatedb",
  "description": "Untuk update database locate",
  "documentation": {
    "overview": "Untuk update database locate",
    "installation": "sudo apt install locate",
    "usage": [
      {
        "mode": "DEFAULT ()",
        "text": "updatedb",
        "options": ""
      }
    ]
  },
  "command": [
    {
      "name": "updatedb",
      "mode": "DEFAULT",
      "description": "",
      "groups": []
    }
  ],
  "relatedTools": []
};