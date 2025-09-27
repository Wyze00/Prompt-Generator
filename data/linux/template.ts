import type { ITool } from '../../types/interfaces';

export const templateTool: ITool = {
  "name": "template",
  "description": "Template aja",
  "documentation": {
    "overview": "Template aja",
    "installation": "sudo apt install",
    "usage": [
      {
        "mode": "DEFAULT (Penggunaan Default)",
        "text": "template",
        "options": "- {<ri> (required input)}\n- {-rf (required flag)}\n- {-rfi <rfi> (required flag input)}\n- [<oi> (optional input)]\n- [-of (optional flag)]\n- [-ofi <ofi> (optional flag input)]\n- {-rof (ro flag) | -roi <roi> (ro input)}\n- [-oof (oo flag) | -ooi <ooi> (oo input)]\n- {<ri> (required input) {-rf (required flag)}}\n- {{-rf (required flag)} <ri> (required input)}\n- [-ofi <ofi> (of input) {-rf (required flag)}]\n- [{-rf (required flag)} -ofi <ofi> (of input)]\n- [-of <of> (optional flag) | <oi> (optional input) {-rfi <rfi> (rf input)}]\n- [-of <of> (optional flag) | {-rfi <rfi> (rf input)} <oi> (optional input)]\n- {aja@<ipt> (required input)}\n- {<ipt1>%%<ipt2> (double required input)}\n- [-oi <ipt>@aja (optional input)]\n- [<ipt1>%%<ipt2> (double optional input) {-rf(rf) {-rf (rf)}} | -ooi <ooi> (oo input) [<oi> (optional input)]]\n- [{{-rf (rf)} -rfi <rfi> (rfi)} <ipt1>%%<ipt2> (double optional input) | [<oi> (optional input)] -ooi <ooi> (oo input)]\n- [-ofi <1>:<2>:<3> (tripple oi) | <oi> (optional input) {-rf (required flag) | <ri> (required input) | -rfi <rfi> (required flag input) [-of (optional flag)]}]\n- [{-ri <ri> (required input) | [-of (opfl)] {-w (wajib)} <ri> (ri) {-wl (wl) [-o1 (o1) | -o2 (o2)]}} -ofi <1>:<2>:<3> (tripple oi) | {-rf (required flag) | <ri> (required input) | -rfi <rfi> (required flag input) [-of (optional flag)]} <oi> (optional input)]"
      },
      {
        "mode": "DEFAULT2 (Default 2)",
        "text": "def2",
        "options": "- [-o <opt> (opt)]"
      }
    ]
  },
  "command": [
    {
      "name": "template",
      "mode": "DEFAULT",
      "description": "Penggunaan Default",
      "groups": [
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<ri>",
              "description": "required input",
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
              "flag": "-rf",
              "description": "required flag",
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
              "flag": "-rfi <rfi>",
              "description": "required flag input",
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
              "flag": "<oi>",
              "description": "optional input",
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
              "flag": "-of",
              "description": "optional flag",
              "input": false,
              "options": []
            }
          ]
        },
        {
          "type": "optional",
          "description": "",
          "flags": [
            {
              "flag": "-ofi <ofi>",
              "description": "optional flag input",
              "input": true,
              "options": []
            }
          ]
        },
        {
          "type": "required_one_of",
          "description": "",
          "flags": [
            {
              "flag": "-rof",
              "description": "ro flag",
              "input": false,
              "options": []
            },
            {
              "flag": "-roi <roi>",
              "description": "ro input",
              "input": true,
              "options": []
            }
          ]
        },
        {
          "type": "optional_one_of",
          "description": "",
          "flags": [
            {
              "flag": "-oof",
              "description": "oo flag",
              "input": false,
              "options": []
            },
            {
              "flag": "-ooi <ooi>",
              "description": "oo input",
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
              "flag": "<ri>",
              "description": "required input",
              "input": true,
              "options": [
                {
                  "type": "required",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rf",
                      "description": "required flag",
                      "input": false,
                      "options": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "<ri>",
              "description": "required input",
              "input": true,
              "options": [
                {
                  "type": "required",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rf",
                      "description": "required flag",
                      "input": false,
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
              "flag": "-ofi <ofi>",
              "description": "of input",
              "input": true,
              "options": [
                {
                  "type": "required",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rf",
                      "description": "required flag",
                      "input": false,
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
              "flag": "-ofi <ofi>",
              "description": "of input",
              "input": true,
              "options": [
                {
                  "type": "required",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rf",
                      "description": "required flag",
                      "input": false,
                      "options": []
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
              "flag": "-of <of>",
              "description": "optional flag",
              "input": true,
              "options": []
            },
            {
              "flag": "<oi>",
              "description": "optional input",
              "input": true,
              "options": [
                {
                  "type": "required",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rfi <rfi>",
                      "description": "rf input",
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
          "type": "optional_one_of",
          "description": "",
          "flags": [
            {
              "flag": "-of <of>",
              "description": "optional flag",
              "input": true,
              "options": []
            },
            {
              "flag": "<oi>",
              "description": "optional input",
              "input": true,
              "options": [
                {
                  "type": "required",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rfi <rfi>",
                      "description": "rf input",
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
          "type": "required",
          "description": "",
          "flags": [
            {
              "flag": "aja@<ipt>",
              "description": "required input",
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
              "flag": "<ipt1>%%<ipt2>",
              "description": "double required input",
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
              "flag": "-oi <ipt>@aja",
              "description": "optional input",
              "input": true,
              "options": []
            }
          ]
        },
        {
          "type": "optional_one_of",
          "description": "",
          "flags": [
            {
              "flag": "<ipt1>%%<ipt2>",
              "description": "double optional input",
              "input": true,
              "options": [
                {
                  "type": "required",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rf",
                      "description": "rf",
                      "input": false,
                      "options": [
                        {
                          "type": "required",
                          "description": "",
                          "flags": [
                            {
                              "flag": "-rf",
                              "description": "rf",
                              "input": false,
                              "options": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "flag": "-ooi <ooi>",
              "description": "oo input",
              "input": true,
              "options": [
                {
                  "type": "optional",
                  "description": "",
                  "flags": [
                    {
                      "flag": "<oi>",
                      "description": "optional input",
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
          "type": "optional_one_of",
          "description": "",
          "flags": [
            {
              "flag": "<ipt1>%%<ipt2>",
              "description": "double optional input",
              "input": true,
              "options": [
                {
                  "type": "required",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rfi <rfi>",
                      "description": "rfi",
                      "input": true,
                      "options": [
                        {
                          "type": "required",
                          "description": "",
                          "flags": [
                            {
                              "flag": "-rf",
                              "description": "rf",
                              "input": false,
                              "options": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "flag": "-ooi <ooi>",
              "description": "oo input",
              "input": true,
              "options": [
                {
                  "type": "optional",
                  "description": "",
                  "flags": [
                    {
                      "flag": "<oi>",
                      "description": "optional input",
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
          "type": "optional_one_of",
          "description": "",
          "flags": [
            {
              "flag": "-ofi <1>:<2>:<3>",
              "description": "tripple oi",
              "input": true,
              "options": []
            },
            {
              "flag": "<oi>",
              "description": "optional input",
              "input": true,
              "options": [
                {
                  "type": "required_one_of",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rf",
                      "description": "required flag",
                      "input": false,
                      "options": []
                    },
                    {
                      "flag": "<ri>",
                      "description": "required input",
                      "input": true,
                      "options": []
                    },
                    {
                      "flag": "-rfi <rfi>",
                      "description": "required flag input",
                      "input": true,
                      "options": [
                        {
                          "type": "optional",
                          "description": "",
                          "flags": [
                            {
                              "flag": "-of",
                              "description": "optional flag",
                              "input": false,
                              "options": []
                            }
                          ]
                        }
                      ]
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
              "flag": "-ofi <1>:<2>:<3>",
              "description": "tripple oi",
              "input": true,
              "options": [
                {
                  "type": "required_one_of",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-ri <ri>",
                      "description": "required input",
                      "input": true,
                      "options": []
                    },
                    {
                      "flag": "<ri>",
                      "description": "ri",
                      "input": true,
                      "options": [
                        {
                          "type": "optional",
                          "description": "",
                          "flags": [
                            {
                              "flag": "-of",
                              "description": "opfl",
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
                              "flag": "-w",
                              "description": "wajib",
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
                              "flag": "-wl",
                              "description": "wl",
                              "input": false,
                              "options": [
                                {
                                  "type": "optional_one_of",
                                  "description": "",
                                  "flags": [
                                    {
                                      "flag": "-o1",
                                      "description": "o1",
                                      "input": false,
                                      "options": []
                                    },
                                    {
                                      "flag": "-o2",
                                      "description": "o2",
                                      "input": false,
                                      "options": []
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "flag": "<oi>",
              "description": "optional input",
              "input": true,
              "options": [
                {
                  "type": "required_one_of",
                  "description": "",
                  "flags": [
                    {
                      "flag": "-rf",
                      "description": "required flag",
                      "input": false,
                      "options": []
                    },
                    {
                      "flag": "<ri>",
                      "description": "required input",
                      "input": true,
                      "options": []
                    },
                    {
                      "flag": "-rfi <rfi>",
                      "description": "required flag input",
                      "input": true,
                      "options": [
                        {
                          "type": "optional",
                          "description": "",
                          "flags": [
                            {
                              "flag": "-of",
                              "description": "optional flag",
                              "input": false,
                              "options": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "def2",
      "mode": "DEFAULT",
      "description": "Default 2",
      "groups": [
        {
          "type": "optional",
          "description": "",
          "flags": [
            {
              "flag": "-o <opt>",
              "description": "opt",
              "input": true,
              "options": []
            }
          ]
        }
      ]
    }
  ],
  "relatedTools": [
    "dig",
    "man",
    "apropos"
  ]
};