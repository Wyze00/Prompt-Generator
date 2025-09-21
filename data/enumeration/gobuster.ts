import type { ITool } from "../../types/interfaces"; 

export const gobusterTool: ITool = {
    name: 'gobuster',
    description: 'Directory/File, DNS and VHost busting tool',
    command: [
        {
            name: 'gobuster dir',
            description: 'Directory and file brute forcing',
            groups: [
                {
                    type: 'required',
                    flags: [
                        {
                            flag: '-u <url>',
                            description: 'Target URL',
                            input: true,
                            options: [
                                { type: 'optional', flags: [{ flag: '-o1 <str>', description: 'Some description', input: true }] },
                                { type: 'optional', flags: [{ flag: '-o1 <str>', description: 'Some description', input: true }] },
                                // { type: 'required', flags: [{ flag: '-o2 <str>', description: 'Some description', input: true }] },
                                {
                                  type: 'required_one_of',
                                  description: 'Wordlist or extension (Nested)',
                                  flags: [
                                      { flag: '-o3 <wordlist>', description: 'Wordlist path', input: true },
                                      { flag: '-o4 <str>', description: 'Some description', input: true, options: [
                                        {
                                          type: 'required',
                                          flags: [
                                            {
                                              flag: '-mx',
                                              description: 'test',
                                              input: true,
                                              options: [
                                                {
                                                  type: 'required_one_of',
                                                  description: 'Wordlist or extension (Nested)',
                                                  flags: [
                                                      { flag: '-o3 <wordlist>', description: 'Wordlist path', input: true },
                                                      { flag: '-o4 <str>', description: 'Some description', input: true}
                                                  ]
                                                },
                                              ]
                                            }
                                          ],
                                        }
                                      ] }
                                  ]
                                },
                                {
                                  type: 'required_one_of',
                                  description: 'Wordlist or extension (Nested)',
                                  flags: [
                                      { flag: '-o3 <wordlist>', description: 'Wordlist path', input: true },
                                      { flag: '-o4 <str>', description: 'Some description', input: true, options: [
                                        {
                                          type: 'required',
                                          flags: [
                                            {
                                              flag: '-mx',
                                              description: 'test',
                                              input: true,
                                              options: [
                                                {
                                                  type: 'required_one_of',
                                                  description: 'Wordlist or extension (Nested)',
                                                  flags: [
                                                      { flag: '-o3 <wordlist>', description: 'Wordlist path', input: true },
                                                      { flag: '-o4 <str>', description: 'Some description', input: true}
                                                  ]
                                                },
                                              ]
                                            }
                                          ],
                                        }
                                      ] }
                                  ]
                                },
                                {
                                  type: 'optional_one_of',
                                  description: 'Another choice (Nested)',
                                  flags: [
                                      { flag: '-o5 <wordlist>', description: 'Wordlist path', input: true },
                                      { flag: '-o6 <str>', description: 'Some description', input: true }
                                  ]
                                },
                            ]
                        },
                        {
                          flag: '-req',
                          description: 'my'
                        }
                    ]
                },
                // {
                //     type: 'required_one_of',
                //     description: 'Wordlist or extension',
                //     flags: [
                //         { flag: '-w <wordlist>', description: 'Wordlist path', input: true },
                //         { flag: '-x <str>', description: 'Some description', input: true }
                //     ]
                // },
                { type: 'optional', flags: [{ flag: '-y <str>', description: 'Some description', input: true }] },
                { type: 'optional', flags: [{ flag: '-y <str>', description: 'Some description', input: true }] },
                {
                    type: 'optional_one_of',
                    description: 'Additional options',
                    flags: [
                        { flag: '-z <str>', description: 'Some description', input: true },
                        { flag: '-1 <str>', description: 'Some description', input: true }
                    ]
                }
            ]
        },
        {
            name: 'gobuster dns',
            description: 'DNS subdomain brute forcing',
            groups: [
                { type: 'required', flags: [{ flag: '-d <domain>', description: 'Target domain', input: true }] },
                { type: 'required', flags: [{ flag: '-w <wordlist>', description: 'Wordlist path', input: true }] }
            ]
        }
    ],
    documentation: {
      overview: 'Tool untuk brute force direktori, file, vhost, dns dan lainnya.',
      installation: 'sudo apt install gobuster',
      usage: [
        {
          mode: 'DIRECTORY',
          text: 'gobuster dir',
          options: `
- {-u <url> (url)}
  - [-xx <str> (some desc)]
- {-w <wordlist> (wordlist path) | -x <str> (some desc)}
- [-y <str> (some desc)]
- [-z <str (some desc) | -1 <str> (some desc)]
        `.trim(),
        },
        {
          mode: 'DNS',
          text: 'gobuster dns',
          options: `
- {-d <domain> (domain)}
- {-w <wordlist> (wordlist path)}
          `.trim(),
        }
      ]
    },
};