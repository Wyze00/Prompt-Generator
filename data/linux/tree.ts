import type { ITool } from '../../types/interfaces';

export const treeTool: ITool = {
  "name": "tree",
  "description": "Print suatu directory dengan format pohon",
  "documentation": {
    "overview": "Print suatu directory dengan format pohon",
    "installation": "sudo apt install tree",
    "usage": [
      {
        "mode": "DEFAULT ()",
        "text": "tree",
        "options": "- {<directory> (Nama directory)}"
      }
    ]
  },
  "command": [
    {
      "name": "tree",
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