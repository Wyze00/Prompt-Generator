import type { ITool } from '~~/types/interfaces';

export const digTool: ITool = {
  "name": "dig",
  "description": "Tools untuk query dns record",
  "documentation": {
    "overview": "Tools untuk query dns record",
    "installation": "sudo apt install dnsutils",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan default dari dig)",
        "text": "dig",
        "options": "- {<type> (tipe) | -x (reverse lookup)}\n- {<domain> (domain name / ip)}\n- [@<nameServer> (name server)]"
      }
    ]
  },
  "command": [
    {
      "name": "dig",
      "mode": "DEFAULT",
      "description": "Penggunaan default dari dig",
      "groups": [
        {
          "type": "required_one_of",
          "description": "",
          "flags": [
            {
              "flag": "<type>",
              "description": "tipe",
              "input": true,
              "options": []
            },
            {
              "flag": "-x",
              "description": "reverse lookup",
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
              "flag": "<domain>",
              "description": "domain name / ip",
              "input": true,
              "options": []
            }
          ]
        },
        {
          "type": "optional",
          "description": "",
          "flags": [
            {
              "flag": "@<nameServer>",
              "description": "name server",
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