import type { ITool } from '../../types/interfaces';

export const whoisTool: ITool = {
  "name": "whois",
  "description": "Tools untuk query whois record",
  "documentation": {
    "overview": "Tools untuk query whois record",
    "installation": "sudo apt install whois",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan default dari whois)",
        "text": "whois",
        "options": "- {<domain> (domain)}"
      }
    ]
  },
  "command": [
    {
      "name": "whois",
      "mode": "DEFAULT",
      "description": "Penggunaan default dari whois",
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
  ]
};