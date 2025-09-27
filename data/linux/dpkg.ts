import type { ITool } from '../../types/interfaces';

export const dpkgTool: ITool = {
  "name": "dpkg",
  "description": "Package manager untuk distro debian",
  "documentation": {
    "overview": "Package manager untuk distro debian",
    "installation": "sudo apt install dpkg",
    "usage": [
      {
        "mode": "DEFAULT (Default usage)",
        "text": "dpkg",
        "options": "- [-S <path> (Mencari tau package suatu binary file)]\n- [-L <package> (Mencari tau suatu package menginstall apa saja)]"
      }
    ]
  },
  "command": [
    {
      "name": "dpkg",
      "mode": "DEFAULT",
      "description": "Default usage",
      "groups": [
        {
          "type": "optional",
          "description": "",
          "flags": [
            {
              "flag": "-S <path>",
              "description": "Mencari tau package suatu binary file",
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
              "flag": "-L <package>",
              "description": "Mencari tau suatu package menginstall apa saja",
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