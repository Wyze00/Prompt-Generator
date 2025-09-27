import type { ITool } from '../../types/interfaces';

export const whereisTool: ITool = {
  "name": "whereis",
  "description": "Untuk mencari binary dan man files dari suatu tools",
  "documentation": {
    "overview": "Untuk mencari binary dan man files dari suatu tools",
    "installation": "sudo apt istall util-linux",
    "usage": [
      {
        "mode": "DEFAULT ()",
        "text": "whereis",
        "options": "- {<tools> (Tools yang ingin dicari)}"
      }
    ]
  },
  "command": [
    {
      "name": "whereis",
      "mode": "DEFAULT",
      "description": "",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<tools>",
              "description": "Tools yang ingin dicari",
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