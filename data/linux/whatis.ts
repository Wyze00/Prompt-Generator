import type { ITool } from '../../types/interfaces';

export const whatisTool: ITool = {
  "name": "whatis",
  "description": "Shortcut untuk 'man -f', untuk mencari title bedasarkan regex",
  "documentation": {
    "overview": "Shortcut untuk 'man -f', untuk mencari title bedasarkan regex",
    "installation": "sudo apt install man-db",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan Default)",
        "text": "whatis",
        "options": "- {<regex> (cari bedasarkan nama)}"
      }
    ]
  },
  "command": [
    {
      "name": "whatis",
      "mode": "DEFAULT",
      "description": "Penggunaan Default",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<regex>",
              "description": "cari bedasarkan nama",
              "input": true,
              "options": []
            }
          ]
        }
      ]
    }
  ],
  "relatedTools": [
    "man",
    "apropos"
  ]
};