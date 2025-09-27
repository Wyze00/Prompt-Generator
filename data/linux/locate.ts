import type { ITool } from '../../types/interfaces';

export const locateTool: ITool = {
  "name": "locate",
  "description": "Untuk mencari lokasi suatu file / folder",
  "documentation": {
    "overview": "Untuk mencari lokasi suatu file / folder",
    "installation": "sudo apt install locate",
    "usage": [
      {
        "mode": "DEFAULT ()",
        "text": "locate",
        "options": "- {<keyword> (Keyword)}"
      }
    ]
  },
  "command": [
    {
      "name": "locate",
      "mode": "DEFAULT",
      "description": "",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<keyword>",
              "description": "Keyword",
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