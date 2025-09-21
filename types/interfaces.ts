/**
 * Mendefinisikan tipe-tipe logika untuk sebuah grup flag.
 * - required: Wajib ada, hanya 1 flag dalam grup.
 * - optional: Opsional, hanya 1 flag dalam grup.
 * - required_one_of: Wajib ada, pilih salah satu dari beberapa flag.
 * - optional_one_of: Opsional, jika dipakai, pilih salah satu dari beberapa flag.
 */
export type GroupType = 'required' | 'optional' | 'required_one_of' | 'optional_one_of';

/**
 * Interface untuk sebuah flag atau argumen individual.
 */
export interface IFlag {
    /** Nama flag atau placeholder argumen (e.g., '-u', '<domain>') */
    flag: string;
    /** Deskripsi fungsi flag */
    description: string;
    /** Apakah flag ini membutuhkan input dari user? (e.g., -u <url>) */
    input?: boolean;
    /** Opsi turunan yang hanya bisa dipakai jika flag ini digunakan */
    options?: IGroup[];
}

/**
 * Interface untuk sebuah grup flag yang diikat oleh satu aturan logika.
 */
export interface IGroup {
    /** Aturan logika yang berlaku untuk semua flag di dalam grup ini */
    type: GroupType;
    /** Deskripsi opsional untuk grup (berguna untuk UI) */
    description?: string;
    /** Daftar flag yang termasuk dalam grup ini */
    flags: IFlag[];
}

/**
 * Interface untuk sebuah command spesifik dari sebuah tool (e.g., 'dir' pada gobuster).
 */
export interface ICommand {
    /** Nama command */
    name: string;
    /** Deskripsi singkat tentang fungsi command */
    description: string;
    /** Kumpulan aturan dan flag yang tersedia untuk command ini */
    groups: IGroup[];
}

/**
 * Interface level tertinggi yang merepresentasikan keseluruhan tool.
 */
export interface ITool {
    /** Nama tool (e.g., 'gobuster', 'dig') */
    name: string;
    /** Deskripsi umum dari tool */
    description: string;
    /** Daftar command yang dimiliki oleh tool ini */
    command: ICommand[];
    documentation?: {
        overview: string;
        installation: string;
        usage: IUsageCommand[];
    };
}

export interface IUsageCommand {
    mode: string; // Directory
    text: string; // dir
    options: string // 
}