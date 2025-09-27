import type { ITool } from '../../types/interfaces';

export const aproposTool: ITool = {
  "name": "apropos",
  "description": "Shortcut untuk 'man -k', mencari description dengan regex",
  "documentation": {
    "overview": "Shortcut untuk 'man -k', mencari description dengan regex",
    "installation": "sudo apt install man-db",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan Default)",
        "text": "apropos",
        "options": "- {<regex> (cari bedasarkan description)}"
      }
    ]
  },
  "command": [
    {
      "name": "apropos",
      "mode": "DEFAULT",
      "description": "Penggunaan Default",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<regex>",
              "description": "cari bedasarkan description",
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
    "whatis"
  ]
};