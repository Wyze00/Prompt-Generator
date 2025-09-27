import type { ITool } from '../../types/interfaces';

export const whichTool: ITool = {
  "name": "which",
  "description": "Untuk mencari lokasi binary file suatu tools dari PATH variable yang dipakai saat ini",
  "documentation": {
    "overview": "Untuk mencari lokasi binary file suatu tools dari PATH variable yang dipakai saat ini",
    "installation": "sudo apt install debianutils",
    "usage": [
      {
        "mode": "DEFAULT ()",
        "text": "which",
        "options": "- {<tools> (Nama toolsnya)}"
      }
    ]
  },
  "command": [
    {
      "name": "which",
      "mode": "DEFAULT",
      "description": "",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<tools>",
              "description": "Nama toolsnya",
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