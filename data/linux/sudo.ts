import type { ITool } from '../../types/interfaces';

export const sudoTool: ITool = {
  "name": "sudo",
  "description": "Jalankan program sebagai user lain",
  "documentation": {
    "overview": "Jalankan program sebagai user lain",
    "installation": "sudo apt install sudo",
    "usage": [
      {
        "mode": "DEFAULT ()",
        "text": "sudo",
        "options": "- [[-u <user> (Jalankan sebagai <user>)] <tools> (Nama tools yang ingin dijalankan)]\n- [-l (List privilege dalam akun ini)]"
      }
    ]
  },
  "command": [
    {
      "name": "sudo",
      "mode": "DEFAULT",
      "description": "",
      "groups": [
        {
          "type": "optional",
          "description": "",
          "flags": [
            {
              "flag": "<tools>",
              "description": "Nama tools yang ingin dijalankan",
              "input": true,
              "options": [
                {
                  "type": "optional",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-u <user>",
                      "description": "Jalankan sebagai <user>",
                      "input": true,
                      "options": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "optional",
          "description": "",
          "flags": [
            {
              "flag": "-l",
              "description": "List privilege dalam akun ini",
              "input": false,
              "options": []
            }
          ]
        }
      ]
    }
  ],
  "relatedTools": [
    "su"
  ]
};