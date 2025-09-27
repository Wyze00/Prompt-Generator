import type { ITool } from '../../types/interfaces';

export const cdTool: ITool = {
  "name": "cd",
  "description": "Ubah current working directory",
  "documentation": {
    "overview": "Ubah current working directory",
    "installation": "sudo apt install",
    "usage": [
      {
        "mode": "DEFAULT ()",
        "text": "cd",
        "options": "- {<directory> (Nama directory)}"
      }
    ]
  },
  "command": [
    {
      "name": "cd",
      "mode": "DEFAULT",
      "description": "",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<directory>",
              "description": "Nama directory",
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