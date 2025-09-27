import type { ITool } from '../../types/interfaces';

export const gobusterTool: ITool = {
  relatedTools: ['dig', 'braa'],
  "name": "gobuster",
  "description": "tools untuk brute force directory, file. vhost, dns dan lainnya",
  "documentation": {
    "overview": "tools untuk brute force directory, file. vhost, dns dan lainnya",
    "installation": "sudo apt install gobuster",
    "usage": [
      {
        "mode": "DIRECTORY agd",
        "text": "gobuster dir",
        "options": "- {-u <url> (url)}\n- [-xx <str> (some desc)]\n- {-w <wordlist> (wordlist path) | -x <str> (some desc)}\n- [-y <str> (some desc)]\n- [-z <str (some desc) | -1 <str> (some desc)]"
      },
      {
        "mode": "DNS",
        "text": "gobuster dns",
        "options": ""
      }
    ]
  },
  "command": [
    {
      "name": "gobuster dir",
      "mode": "DIRECTORY",
      "description": "adalah",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "-u <url>",
              "description": "url",
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
              "flag": "-xx <str>",
              "description": "some desc",
              "input": true,
              "options": [
                {
                  type: 'required',
                  flags: [
                    {
                      flag: '-x <c>',
                      description: '',
                      input: true
                    },
                    {
                      flag: '-x <c>',
                      description: '',
                      input: true
                    }
                  ]
                }, 
                {
                  type: 'optional_one_of',
                  flags: [
                    {
                      description: '',
                      flag: '-x'
                    },
                    {
                      description: '',
                      flag: '-x'
                    },
                    {
                      description: '',
                      flag: '-x'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "required_one_of",
          "description": "",
          "flags": [
            {
              "flag": "-w <wordlist>",
              "description": "wordlist path",
              "input": true,
              "options": []
            },
            {
              "flag": "-x <str>",
              "description": "some desc",
              "input": true,
              "options": [
                {
                  type: 'required',
                  flags: [
                    {
                      flag: '-x <c>',
                      description: '',
                      input: true
                    },
                    {
                      flag: '-x <c>',
                      description: '',
                      input: true
                    }
                  ]
                }, 
                {
                  type: 'optional_one_of',
                  flags: [
                    {
                      description: '',
                      flag: '-x'
                    },
                    {
                      description: '',
                      flag: '-x'
                    },
                    {
                      description: '',
                      flag: '-x'
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
              "flag": "-y <str>",
              "description": "some desc",
              "input": true,
              "options": [
                {
                  type: 'required',
                  flags: [
                    {
                      flag: '-x <c>',
                      description: '',
                      input: true
                    },
                    {
                      flag: '-x <c>',
                      description: '',
                      input: true
                    }
                  ]
                }, 
                {
                  type: 'optional_one_of',
                  flags: [
                    {
                      description: '',
                      flag: '-x'
                    },
                    {
                      description: '',
                      flag: '-x'
                    },
                    {
                      description: '',
                      flag: '-x'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "optional_one_of",
          "description": "",
          "flags": [
            {
              "flag": "-z <str>",
              "description": "some desc",
              "input": true,
              "options": []
            },
            {
              "flag": "-1 <str>",
              "description": "some desc",
              "input": true,
              "options": []
            }
          ]
        }
      ]
    },
    {
      "name": "gobuster dns",
      "mode": "DNS",
      "description": "",
      "groups": []
    }
  ]
};