// HAPUS STORYSCRIPT LAMA ANDA DAN GANTI DENGAN KODE LENGKAP DI BAWAH INI

const storyScript = [
    // ======================================================
    // ADEGAN 1: STASIUN KERETA
    // ======================================================
    {
        type: 'dialogue',
        character: 'Narator',
        background: 'bg_stasiun.png',
        text: 'Ramalia baru saja tiba di Edinburgh. Udara dingin langsung menyambutnya begitu ia turun dari kereta.'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'ramalia/normal.png',
        text: '(Hahh... akhirnya sampai juga. Kota ini... indah.)'
    },
    {
        type: 'dialogue',
        character: 'Narator',
        text: 'Saat ia hendak melangkah, tiba-tiba... BRUK!'
    },
    {
        type: 'dialogue',
        character: '???',
        sprite: 'azain/kaget_khawatir.png',
        text: 'Oh, maaf sekali! Anda tidak apa-apa? Saya benar-benar tidak sengaja.'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'ramalia/kaget.png',
        text: 'Ah, iya, tidak apa-apa. Hanya sedikit terkejut.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'azain/senyum.png',
        text: 'Syukurlah. Saya Azain. Sekali lagi maaf, ya.'
    },
    {
        type: 'choice',
        choices: [
            { text: 'Perkenalkan diri dengan ramah.', target: 'perkenalan_ramah' },
            { text: 'Jawab dengan sedikit jutek.', target: 'perkenalan_jutek' }
        ]
    },

    // --- CABANG JUTEK (ENDING PENDEK) ---
    {
        id: 'perkenalan_jutek',
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'ramalia/normal.png',
        text: 'Iya. Lain kali hati-hati.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'azain/kaget_khawatir.png',
        text: 'Ah... iya, tentu. Maaf.'
    },
    {
        type: 'dialogue',
        character: 'Narator',
        text: 'Azain pun pergi dengan canggung. Mungkin ini bukan awal yang baik.'
    },
    { type: 'end' },

    // --- CABANG RAMAH (CERITA UTAMA) ---
    {
        id: 'perkenalan_ramah',
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'ramalia/senyum.png',
        text: 'Tidak masalah. Saya Ramalia. Senang bertemu denganmu, Azain.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'azain/senyum.png',
        text: 'Ramalia... nama yang indah. Sebagai permintaan maaf, maukah kamu minum kopi atau teh hangat? Ada kafe bagus dekat sini.'
    },
    {
        type: 'choice',
        choices: [
            { text: 'Terima ajakannya.', target: 'adegan_kafe' },
            { text: 'Tolak dengan sopan.', target: 'tolak_ajakan' }
        ]
    },
    
    // --- CABANG TOLAK AJAKAN (ENDING PENDEK) ---
    {
        id: 'tolak_ajakan',
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'ramalia/normal.png',
        text: 'Terima kasih tawarannya, tapi sepertinya saya harus segera pergi. Mungkin lain kali.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'azain/normal.png',
        text: 'Oh, begitu. Tentu saja. Semoga harimu menyenangkan, Ramalia.'
    },
    { type: 'end' },

    // ======================================================
    // ADEGAN 2: KAFE
    // ======================================================
    {
        id: 'adegan_kafe',
        type: 'dialogue',
        character: 'Narator',
        background: 'bg_kafe.png',
        text: 'Mereka pun berjalan ke kafe kecil yang hangat. Aroma kopi dan kue kering memenuhi udara.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'azain/senyum.png',
        text: 'Jadi, apa yang membawamu ke Edinburgh, Ramalia? Berlibur?'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'ramalia/senyum.png',
        text: 'Bukan hanya liburan, saya memang pindah ke sini. Mencari suasana baru.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'azain/senyum.png',
        text: 'Wow, keputusan yang berani. Kamu tidak akan menyesal, kota ini punya banyak sekali kejutan. Saya bisa menunjukkannya padamu kapan-kapan, kalau mau.'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'ramalia/malu.png',
        text: 'Benarkah? Tentu aku mau sekali!'
    },
    {
        type: 'dialogue',
        character: 'Narator',
        text: 'Percakapan mereka mengalir begitu saja. Waktu terasa berjalan cepat. Sebelum berpisah, Azain mengajaknya bertemu lagi besok.'
    },
    { type: 'jump', target: 'adegan_pantai' }, // Langsung lompat ke adegan berikutnya

    // ======================================================
    // ADEGAN 3: PANTAI
    // ======================================================
    {
        id: 'adegan_pantai',
        type: 'dialogue',
        character: 'Narator',
        background: 'bg_pantai_senja.png',
        text: 'Keesokan harinya, Azain membawa Ramalia ke pantai saat matahari mulai terbenam. Pemandangannya luar biasa.'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'ramalia/senyum.png',
        text: 'Ini... indah sekali, Zain. Terima kasih sudah membawaku ke sini.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'azain/senyum.png',
        text: 'Aku tahu kamu akan suka. Entah kenapa, aku merasa nyaman saat bersamamu, Ramalia.'
    },
    {
        type: 'dialogue',
        character: 'Narator',
        text: 'Azain menatap Ramalia dengan tatapan yang berbeda dari biasanya. Hening sejenak, hanya suara ombak yang terdengar.'
    },
    {
        type: 'choice',
        choices: [
            { text: 'Balas tatapannya & tersenyum.', target: 'pilihan_romantis' },
            { text: 'Alihkan pandangan karena malu.', target: 'pilihan_teman' }
        ]
    },

    // ======================================================
    // ADEGAN 4: PUNCAK BUKIT (ENDING)
    // ======================================================

    // --- JALUR MENUJU GOOD ENDING ---
    {
        id: 'pilihan_romantis',
        type: 'dialogue',
        character: 'Azain',
        sprite: 'azain/malu.png',
        text: 'Sepertinya... aku mulai menyukaimu. Maukah kamu melihat lebih banyak kejutan di kota ini bersamaku? Bukan hanya sebagai teman.'
    },
    { type: 'jump', target: 'good_ending' },

    // --- JALUR MENUJU NORMAL ENDING ---
    {
        id: 'pilihan_teman',
        type: 'dialogue',
        character: 'Azain',
        sprite: 'azain/senyum.png',
        text: 'Haha, ayo jalan lagi. Aku akan tunjukkan pemandangan yang lebih bagus dari atas bukit itu.'
    },
    { type: 'jump', target: 'normal_ending' },

    // --- HASIL AKHIR ---
    {
        id: 'good_ending',
        type: 'dialogue',
        character: 'Narator',
        background: 'bg_puncak_bukit.png',
        text: 'Di puncak bukit yang memandang ke seluruh kota, sebuah kisah cinta baru di Edinburgh telah dimulai.'
    },
    {
        type: 'dialogue',
        character: 'SYSTEM',
        text: 'GOOD ENDING. Terima kasih telah bermain!'
    },
    { type: 'end' },

    {
        id: 'normal_ending',
        type: 'dialogue',
        character: 'Narator',
        background: 'bg_puncak_bukit.png',
        text: 'Di puncak bukit, mereka memandang kota sebagai dua sahabat baru, siap untuk petualangan selanjutnya.'
    },
    {
        type: 'dialogue',
        character: 'SYSTEM',
        text: 'NORMAL ENDING. Terima kasih telah bermain!'
    },
    { type: 'end' }
];

// Pastikan Anda juga menambahkan 'jump' ke dalam fungsi displayScene
// (jika belum ada dari kode sebelumnya)

function displayScene(index) {
    const scene = storyScript[index];
    // ... (kode yang lain tetap sama)
    
    // Proses tipe adegan
    if (scene.type === 'dialogue') {
        // ...
    } else if (scene.type === 'choice') {
        // ...
    } else if (scene.type === 'jump') { // Tambahkan atau pastikan ini ada
        const targetIndex = storyScript.findIndex(s => s.id === scene.target);
        if (targetIndex !== -1) {
            currentSceneIndex = targetIndex;
            displayScene(currentSceneIndex);
        }
    } else if (scene.type === 'end') {
        // ...
    }
}