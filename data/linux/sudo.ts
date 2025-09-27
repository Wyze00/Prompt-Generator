import type { ITool } from '../../types/interfaces';

export const sudoTool: ITool = {
  "name": "sudo",
  "description": "jalankan program sebagai user lain",
  "documentation": {
    "overview": "jalankan program sebagai user lain",
    "installation": "sudo apt install sudo",
    "usage": [
      {
        "mode": "- **sudo**",
        "text": "",
        "options": "- <command>\n- [-u <user>] -> jalankan commad sebagai <user>\n- [-l] -> list tertentu"
      }
    ]
  },
  "command": [
    {
      "name": "",
      "mode": "",
      "description": "",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<command>",
              "description": "",
              "input": true,
              "options": []
            }
          ]
        },
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "[-u <user>] -> jalankan commad sebagai <user>",
              "description": "",
              "input": true,
              "options": []
            }
          ]
        },
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "[-l] -> list tertentu",
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