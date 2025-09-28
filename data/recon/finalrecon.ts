import type { ITool } from '~~/types/interfaces';

export const finalreconTool: ITool = {
  "name": "finalrecon",
  "description": "Tools untuk melakukan recon secara otomatis",
  "documentation": {
    "overview": "Tools untuk melakukan recon secara otomatis",
    "installation": "git clone https://github.com/thewhiteh4t/FinalRecon.git\ncd FinalRecon\npython3 -m venv venv\nsource venv/bin/activate\npip3 install -r requirements.txt\nchmod +x ./finalrecon.py",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan default dari Finalrecon)",
        "text": "finalrecon.py",
        "options": "- [--help (help)]"
      }
    ]
  },
  "command": [
    {
      "name": "finalrecon.py",
      "mode": "DEFAULT",
      "description": "Penggunaan default dari Finalrecon",
      "groups": [
        {
          "type": "optional",
          "description": "",
          "flags": [
            {
              "flag": "--help",
              "description": "help",
              "input": false,
              "options": []
            }
          ]
        }
      ]
    }
  ],
  "relatedTools": []
};