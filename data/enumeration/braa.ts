import type { ITool } from '../../types/interfaces';

export const braaTool: ITool = {
  "name": "braa",
  "description": "Tools untuk enumerate SNMP server",
  "documentation": {
    "overview": "Tools untuk enumerate SNMP server",
    "installation": "sudo apt install braa",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan default dari braa)",
        "text": "braa",
        "options": "- {<comunity>@<ip>:1.3.6.* (default)}"
      }
    ]
  },
  "command": [
    {
      "name": "braa",
      "mode": "DEFAULT",
      "description": "Penggunaan default dari braa",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<comunity>@<ip>:1.3.6.*",
              "description": "default",
              "input": true,
              "options": []
            }
          ]
        }
      ]
    }
  ]
};