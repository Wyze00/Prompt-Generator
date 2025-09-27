import type { ITool } from '../../types/interfaces';

export const manTool: ITool = {
  "name": "man",
  "description": "Untuk melihat manual page dari suatu tools",
  "documentation": {
    "overview": "Untuk melihat manual page dari suatu tools",
    "installation": "sudo apt install man-db",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan Default)",
        "text": "man",
        "options": "- {[-f (Search title) | -k (Search description)] <tools> (Nama tools)}"
      }
    ]
  },
  "command": [
    {
      "name": "man",
      "mode": "DEFAULT",
      "description": "Penggunaan Default",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<tools>",
              "description": "Nama tools",
              "input": true,
              "options": [
                        {
                  "type": "optional_one_of",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-f",
                      "description": "Search title",
                      "input": false,
                      "options": []
                    },
                    {
                      "flag": "-k",
                      "description": "Search description",
                      "input": false,
                      "options": []
                    }
                  ]
                },
              ]
            }
          ]
        }
      ]
    }
  ]
};