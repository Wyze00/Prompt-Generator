import type { ITool } from "../../types/interfaces"; 

export const digTool: ITool = {
    name: 'dig',
    description: 'DNS lookup utility',
    command: [
        {
            name: 'dig',
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
                {
                    type: 'optional_one_of',
                    description: 'Tentukan tipe query',
                    flags: [
                        {
                            flag: '<type>',
                            description: 'Tipe record (e.g., A, MX, TXT, ANY)',
                            input: true
                        },
                        {
                            flag: '-x',
                            description: 'Lakukan reverse lookup (untuk IP)',
                            input: false
                        }
                    ]
                },
                {
                    type: 'optional',
                    description: 'Opsi tambahan',
                    flags: [
                        {
                            flag: '@<nameServer>',
                            description: 'Gunakan nameserver spesifik',
                            input: true
                        },
                        {
                            flag: '+short',
                            description: 'Tampilkan jawaban dalam format singkat',
                            input: false
                        }
                    ]
                }
            ]
        }
    ]
}