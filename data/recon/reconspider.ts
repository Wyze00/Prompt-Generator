import type { ITool } from '../../types/interfaces';

export const reconspiderTool: ITool = {
  "name": "reconspider",
  "description": "Web crawler bot yang bisa dikostumisasi",
  "documentation": {
    "overview": "Web crawler bot yang bisa dikostumisasi",
    "installation": "wget -O ReconSpider.zip https://academy.hackthebox.com/storage/modules/144/ReconSpider.v1.2.zip\nunzip ReconSpider.zip",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan default dari ReconSpider)",
        "text": "python3 ReconSpider.py",
        "options": "- {<url> (url)}"
      }
    ]
  },
  "command": [
    {
      "name": "python3 ReconSpider.py",
      "mode": "DEFAULT",
      "description": "Penggunaan default dari ReconSpider",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<url>",
              "description": "url",
              "input": true,
              "options": []
            }
          ]
        }
      ]
    }
  ]
};