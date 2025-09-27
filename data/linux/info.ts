import type { ITool } from '../../types/interfaces';

export const infoTool: ITool = {
  "name": "info",
  "description": "Seperti buku panduan untuk suatu tools",
  "documentation": {
    "overview": "Seperti buku panduan untuk suatu tools",
    "installation": "sudo apt install info",
    "usage": [
      {
        "mode": "DEFAULT ()",
        "text": "info",
        "options": "- {<tools> (Nama tools)}"
      }
    ]
  },
  "command": [
    {
      "name": "info",
      "mode": "DEFAULT",
      "description": "",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<tools>",
              "description": "Nama tools",
              "input": true,
              "options": []
            }
          ]
        }
      ]
    }
  ],
  "relatedTools": []
};