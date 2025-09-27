import type { ITool } from '../../types/interfaces';

export const aptfileTool: ITool = {
  "name": "apt-file",
  "description": "Untuk mencari nama package dari suatu tools",
  "documentation": {
    "overview": "Untuk mencari nama package dari suatu tools",
    "installation": "sudo apt install apt-file\napt-file update",
    "usage": [
      {
        "mode": "SEARCH (Search command)",
        "text": "apt-file search",
        "options": "- {<path> (Path ke binary file)}"
      }
    ]
  },
  "command": [
    {
      "name": "apt-file search",
      "mode": "SEARCH",
      "description": "Search command",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<path>",
              "description": "Path ke binary file",
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