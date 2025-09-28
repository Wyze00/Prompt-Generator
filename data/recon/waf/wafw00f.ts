import type { ITool } from '~~/../types/interfaces';

export const wafw00fTool: ITool = {
  "name": "wafw00f",
  "description": "Tools untuk mendeteksi kalau ada web application firewall",
  "documentation": {
    "overview": "Tools untuk mendeteksi kalau ada web application firewall",
    "installation": "sudo apt install wafw00f",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan default dari wafw00f)",
        "text": "wafw00f",
        "options": "- {<domain> (domain)}"
      }
    ]
  },
  "command": [
    {
      "name": "wafw00f",
      "mode": "DEFAULT",
      "description": "Penggunaan default dari wafw00f",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<domain>",
              "description": "domain",
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