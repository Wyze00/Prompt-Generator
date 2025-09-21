import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_RECON_ID;
const CHANNEL_NAME = process.env.CHANNEL_RECON;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Fungsi ini TIDAK BERUBAH. Fungsinya bagus dan bisa dipakai ulang untuk channel/thread.
async function fetchAllMessages(channel) {
    let allMessages = [];
    let lastId;
    while (true) {
        const options = { limit: 100 };
        if (lastId) {
            options.before = lastId;
        }
        const fetchedMessages = await channel.messages.fetch(options);
        if (fetchedMessages.size === 0) {
            break;
        }
        allMessages.push(...fetchedMessages.values());
        lastId = fetchedMessages.lastKey();
    }
    return allMessages;
}

// PERUBAHAN UTAMA ADA DI SINI
client.once('ready', async () => {
    console.log(`Bot telah login sebagai ${client.user.tag}!`);

    try {
        // 1. Dapatkan channel utama (misal: #recon)
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (!channel) {
            console.error("Channel utama tidak ditemukan!");
            client.destroy();
            return;
        }
        console.log(`Menemukan channel utama: #${channel.name}`);

        // 2. Ambil semua thread aktif DAN yang sudah diarsip
        console.log("Mencari semua thread di dalam channel...");
        const activeThreads = await channel.threads.fetch();
        const archivedThreads = await channel.threads.fetchArchived();
        
        // 3. Gabungkan semua thread menjadi satu daftar
        const allThreads = [...activeThreads.threads.values(), ...archivedThreads.threads.values()];
        
        if (allThreads.length === 0) {
            console.log("Tidak ada thread yang ditemukan di channel ini.");
            client.destroy();
            return;
        }
        console.log(`Menemukan total ${allThreads.length} thread. Mulai mengambil pesan dari masing-masing...`);

        const allNotes = {};

        // 4. Loop melalui setiap thread dan ambil pesannya
        for (const thread of allThreads) {
            console.log(`\n--- Mengambil pesan dari thread: "${thread.name}" ---`);
            const messages = await fetchAllMessages(thread);
            
            const simplifiedMessages = messages.map(msg => ({
                id: msg.id,
                content: msg.content,
                author: {
                    id: msg.author.id,
                    username: msg.author.username,
                },
                timestamp: new Date(msg.createdTimestamp).toISOString(),
                attachments: msg.attachments.map(att => att.url)
            }));
            
            // Simpan pesan menggunakan nama thread sebagai kunci
            allNotes[thread.name] = simplifiedMessages;
            console.log(`--- Selesai, ${simplifiedMessages.length} pesan diambil dari "${thread.name}" ---`);
        }

        // 5. Simpan hasil yang sudah terstruktur ke file JSON
        fs.writeFileSync('./discord/fetchOutput/' +  CHANNEL_NAME + '.json', JSON.stringify(allNotes, null, 2));
        console.log(`\nBerhasil! Catatan dari ${Object.keys(allNotes).length} thread telah disimpan ke file ./discord/dfetchOutput/${CHANNEL_NAME}.json`);

    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    } finally {
        client.destroy();
        console.log("Bot telah dimatikan.");
    }
});

client.login(BOT_TOKEN);