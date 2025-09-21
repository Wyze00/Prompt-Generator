import type { ITool } from "../../../types/interfaces"; 

export const tool2: ITool = {
    name: 'tool2',
    description: 'DNS lookup utility',
    command: [
        {
            name: 'tool2',
            description: 'Melakukan query DNS untuk mendapatkan informasi domain.',
            groups: [
                {
                    type: 'required',
                    flags: [
                        {
                            flag: '<domain>',
                            description: 'Domain atau alamat IP yang akan di-query',
                            input: true
                        }
                    ]
                },
            ]
        }
    ]
}
