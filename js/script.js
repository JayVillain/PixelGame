// =================================================================================
// KISAH CINTA DI EDINBURGH - A SIMPLE VISUAL NOVEL ENGINE
// Dibuat dengan Clean Code dan komentar untuk kemudahan belajar.
// Versi ini berisi naskah lengkap dari Awal hingga Akhir.
// =================================================================================

// --- 1. SETUP ELEMENT HTML ---
// Mengambil semua elemen interaktif dari file HTML agar bisa kita manipulasi.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dialogueBox = document.getElementById('dialogue-box');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesBox = document.getElementById('choices-box');

// --- 2. GAME STATE ---
// Variabel untuk menyimpan kondisi atau status game saat ini.
let currentSceneIndex = 0;
const assets = {}; // Objek kosong untuk menyimpan semua gambar yang sudah dimuat.

// =================================================================================
// 3. SCRIPT CERITA (NASKAH GAME) - [UPDATE 2: NASKAH LENGKAP]
// =================================================================================
// Ini adalah naskah lengkap game Anda.
const storyScript = [
    // ======================================================
    // ADEGAN 1: STASIUN KERETA
    // ======================================================
    {
        type: 'dialogue',
        character: 'Narator',
        background: 'assets/images/backgrounds/bg_stasiun.png',
        text: 'Ramalia baru saja tiba di Edinburgh. Udara dingin langsung menyambutnya begitu ia turun dari kereta.'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'assets/images/sprites/ramalia/normal.png',
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
        sprite: 'assets/images/sprites/azain/kaget_khawatir.png',
        text: 'Oh, maaf sekali! Anda tidak apa-apa? Saya benar-benar tidak sengaja.'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'assets/images/sprites/ramalia/kaget.png',
        text: 'Ah, iya, tidak apa-apa. Hanya sedikit terkejut.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'assets/images/sprites/azain/senyum.png',
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
        sprite: 'assets/images/sprites/ramalia/normal.png',
        text: 'Iya. Lain kali hati-hati.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'assets/images/sprites/azain/kaget_khawatir.png',
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
        sprite: 'assets/images/sprites/ramalia/senyum.png',
        text: 'Tidak masalah. Saya Ramalia. Senang bertemu denganmu, Azain.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'assets/images/sprites/azain/senyum.png',
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
        sprite: 'assets/images/sprites/ramalia/normal.png',
        text: 'Terima kasih tawarannya, tapi sepertinya saya harus segera pergi. Mungkin lain kali.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'assets/images/sprites/azain/normal.png',
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
        background: 'assets/images/backgrounds/bg_kafe.png',
        text: 'Mereka pun berjalan ke kafe kecil yang hangat. Aroma kopi dan kue kering memenuhi udara.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'assets/images/sprites/azain/senyum.png',
        text: 'Jadi, apa yang membawamu ke Edinburgh, Ramalia? Berlibur?'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'assets/images/sprites/ramalia/senyum.png',
        text: 'Bukan hanya liburan, saya memang pindah ke sini. Mencari suasana baru.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'assets/images/sprites/azain/senyum.png',
        text: 'Wow, keputusan yang berani. Kamu tidak akan menyesal, kota ini punya banyak sekali kejutan. Saya bisa menunjukkannya padamu kapan-kapan, kalau mau.'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'assets/images/sprites/ramalia/malu.png',
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
        background: 'assets/images/backgrounds/bg_pantai_senja.png',
        text: 'Keesokan harinya, Azain membawa Ramalia ke pantai saat matahari mulai terbenam. Pemandangannya luar biasa.'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'assets/images/sprites/ramalia/senyum.png',
        text: 'Ini... indah sekali, Zain. Terima kasih sudah membawaku ke sini.'
    },
    {
        type: 'dialogue',
        character: 'Azain',
        sprite: 'assets/images/sprites/azain/senyum.png',
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
        sprite: 'assets/images/sprites/azain/malu.png',
        text: 'Sepertinya... aku mulai menyukaimu. Maukah kamu melihat lebih banyak kejutan di kota ini bersamaku? Bukan hanya sebagai teman.'
    },
    { type: 'jump', target: 'good_ending' },

    // --- JALUR MENUJU NORMAL ENDING ---
    {
        id: 'pilihan_teman',
        type: 'dialogue',
        character: 'Azain',
        sprite: 'assets/images/sprites/azain/senyum.png',
        text: 'Haha, ayo jalan lagi. Aku akan tunjukkan pemandangan yang lebih bagus dari atas bukit itu.'
    },
    { type: 'jump', target: 'normal_ending' },

    // --- HASIL AKHIR ---
    {
        id: 'good_ending',
        type: 'dialogue',
        character: 'Narator',
        background: 'assets/images/backgrounds/bg_puncak_bukit.png',
        text: 'Di puncak bukit yang memandang ke seluruh kota, sebuah kisah cinta baru di Edinburgh telah dimulai.'
    },
    {
        type: 'dialogue',
        character: 'SYSTEM',
        sprite: null, // Tidak ada sprite untuk system
        text: 'GOOD ENDING. Terima kasih telah bermain!'
    },
    { type: 'end' },

    {
        id: 'normal_ending',
        type: 'dialogue',
        character: 'Narator',
        background: 'assets/images/backgrounds/bg_puncak_bukit.png',
        text: 'Di puncak bukit, mereka memandang kota sebagai dua sahabat baru, siap untuk petualangan selanjutnya.'
    },
    {
        type: 'dialogue',
        character: 'SYSTEM',
        sprite: null, // Tidak ada sprite untuk system
        text: 'NORMAL ENDING. Terima kasih telah bermain!'
    },
    { type: 'end' }
];

// =================================================================================
// 4. FUNGSI INTI GAME
// =================================================================================

/**
 * Fungsi utama untuk menampilkan adegan ke layar berdasarkan index dari storyScript.
 * @param {number} index - Posisi adegan dalam array storyScript.
 */
function displayScene(index) {
    const scene = storyScript[index];

    // Sembunyikan semua UI dulu untuk memulai dari keadaan bersih
    dialogueBox.classList.add('hidden');
    choicesBox.classList.add('hidden');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan kanvas

    // Gambar latar belakang jika ada di script
    if (scene.background && assets[scene.background]) {
        ctx.drawImage(assets[scene.background], 0, 0, canvas.width, canvas.height);
    } else {
        // Jika tidak ada background baru, gambar background dari adegan sebelumnya
        const prevSceneWithBg = storyScript.slice(0, index).reverse().find(s => s.background);
        if (prevSceneWithBg && assets[prevSceneWithBg.background]) {
            ctx.drawImage(assets[prevSceneWithBg.background], 0, 0, canvas.width, canvas.height);
        }
    }

    // Tampilkan sprite karakter jika ada di script
    if (scene.sprite && assets[scene.sprite]) {
        const sprite = assets[scene.sprite];
        const scale = 2.5;
        const spriteWidth = sprite.width * scale;
        const spriteHeight = sprite.height * scale;
        const x = (canvas.width - spriteWidth) / 2;
        const y = canvas.height - spriteHeight - 20; // Posisi di atas dialog box
        ctx.drawImage(sprite, x, y, spriteWidth, spriteHeight);
    }
    
    // Proses tipe adegan
    if (scene.type === 'dialogue') {
        dialogueBox.classList.remove('hidden');
        characterName.textContent = scene.character;
        dialogueText.textContent = scene.text;
    } 
    else if (scene.type === 'choice') {
        choicesBox.classList.remove('hidden');
        choicesBox.innerHTML = ''; // Kosongkan pilihan sebelumnya

        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.onclick = () => {
                const targetIndex = storyScript.findIndex(s => s.id === choice.target);
                if (targetIndex !== -1) {
                    currentSceneIndex = targetIndex;
                    displayScene(currentSceneIndex);
                } else {
                    console.error('Target scene not found:', choice.target);
                }
            };
            choicesBox.appendChild(button);
        });
    }
    // [UPDATE 3] MENAMBAHKAN LOGIKA UNTUK TIPE 'JUMP'
    else if (scene.type === 'jump') {
        const targetIndex = storyScript.findIndex(s => s.id === scene.target);
        if (targetIndex !== -1) {
            currentSceneIndex = targetIndex;
            displayScene(currentSceneIndex);
        } else {
            console.error('Target scene for jump not found:', scene.target);
        }
    }
    else if (scene.type === 'end') {
        dialogueBox.classList.remove('hidden');
        characterName.textContent = "SYSTEM";
        dialogueText.textContent = "Adegan ini berakhir. Terima kasih sudah bermain!";
        // Hentikan game agar tidak bisa lanjut lagi
        currentSceneIndex = storyScript.length;
    }
}

/**
 * Fungsi untuk maju ke adegan selanjutnya, dipicu oleh klik atau keyboard.
 */
function nextScene() {
    if (!choicesBox.classList.contains('hidden')) {
        return; 
    }
    if (currentSceneIndex >= storyScript.length -1) {
        return;
    }
    currentSceneIndex++;
    if (currentSceneIndex < storyScript.length) {
        displayScene(currentSceneIndex);
    }
}

// =================================================================================
// 5. PEMUAT ASET & INISIALISASI GAME
// =================================================================================

// [UPDATE 1] DAFTAR ASET LENGKAP
const assetPaths = [
    // Backgrounds
    'assets/images/backgrounds/bg_stasiun.png',
    'assets/images/backgrounds/bg_kafe.png',
    'assets/images/backgrounds/bg_pantai_senja.png',
    'assets/images/backgrounds/bg_puncak_bukit.png',

    // Sprites Ramalia
    'assets/images/sprites/ramalia/normal.png',
    'assets/images/sprites/ramalia/senyum.png',
    'assets/images/sprites/ramalia/kaget.png',
    'assets/images/sprites/ramalia/malu.png',

    // Sprites Azain
    'assets/images/sprites/azain/normal.png',
    'assets/images/sprites/azain/senyum.png',
    'assets/images/sprites/azain/kaget_khawatir.png',
    'assets/images/sprites/azain/malu.png'
];


/**
 * Memuat semua aset yang ada di `assetPaths` sebelum game dimulai.
 * @param {function} callback - Fungsi yang akan dijalankan setelah semua aset dimuat.
 */
function startAssetLoader(callback) {
    console.log("Memulai pemuatan aset...");
    let loadedCount = 0;
    
    // Tampilkan layar loading awal
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.font = '20px Verdana';
    ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);

    if (assetPaths.length === 0) {
        callback();
        return;
    }

    assetPaths.forEach(path => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            loadedCount++;
            // Menyimpan gambar yang sudah dimuat ke dalam objek assets dengan path lengkap sebagai key
            assets[path] = img;
            console.log(`Berhasil memuat: ${path}`);
            if (loadedCount === assetPaths.length) {
                console.log("Semua aset berhasil dimuat!");
                callback();
            }
        };
        img.onerror = () => {
            console.error(`Gagal memuat aset: ${path}. Pastikan path dan nama file benar!`);
        };
    });
}

/**
 * Fungsi utama untuk memulai game. Mengatur scene awal dan event listener.
 */
function startGame() {
    console.log("Game Dimulai!");
    currentSceneIndex = 0;
    displayScene(currentSceneIndex);
    
    // Menambahkan event listener untuk klik mouse
    document.getElementById('game-container').addEventListener('click', (event) => {
        if (!event.target.classList.contains('choice-button')) {
            nextScene();
        }
    });

    // Menambahkan event listener untuk keyboard (Spasi atau Enter)
    window.addEventListener('keydown', (event) => {
        if(event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            nextScene();
        }
    });
}

// --- Mulai prosesnya! ---
// Panggil pemuat aset, dan setelah selesai, ia akan memanggil startGame.
startAssetLoader(startGame);