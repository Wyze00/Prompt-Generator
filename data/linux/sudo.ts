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
          "type": "optional",
          "description": "",
          "flags": [
            {
              "flag": "-u <user>",
              "description": "",
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
              "flag": "-l",
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