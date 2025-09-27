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
      },
      {
        "mode": "IN TOOLS (Setelah masuk kedalam manual pagenya)",
        "text": "",
        "options": "- [/ (Search)]\n\n## LINK\n\n- apropos\n- whatis"
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
              "flag": "[-f | -k (Search description)] <tools> (Nama tools)",
              "description": "Search title",
              "input": true,
              "options": []
            }
          ]
        }
      ]
    },
    {
      "name": "",
      "mode": "IN",
      "description": "Setelah masuk kedalam manual pagenya",
      "groups": [
        {
          "type": "optional",
          "description": "",
          "flags": [
            {
              "flag": "/",
              "description": "Search",
              "input": false,
              "options": []
            }
          ]
        },
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "apropos",
              "description": "",
              "input": false,
              "options": []
            }
          ]
        },
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "whatis",
              "description": "",
              "input": false,
              "options": []
            }
          ]
        }
      ]
    }
  ]
};