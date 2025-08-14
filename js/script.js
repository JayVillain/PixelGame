// =================================================================================
// KISAH CINTA DI EDINBURGH - A SIMPLE VISUAL NOVEL ENGINE
// =================================================================================

// --- SETUP ELEMENT HTML ---
// Mengambil semua elemen yang kita butuhkan dari index.html
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dialogueBox = document.getElementById('dialogue-box');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesBox = document.getElementById('choices-box');

// --- STATE GAME ---
// Variabel untuk menyimpan kondisi game saat ini
let currentSceneIndex = 0;
let assets = {}; // Objek untuk menyimpan semua gambar yang sudah dimuat

// =================================================================================
// SCRIPT CERITA
// =================================================================================
// Ini adalah "naskah" game Anda. Setiap objek adalah satu baris dialog atau event.
// Anda bisa menambahkan cerita Anda di sini.
const storyScript = [
    {
        type: 'dialogue',
        character: 'Narator',
        text: 'Ramalia baru saja tiba di Edinburgh. Udara dingin langsung menyambutnya begitu ia turun dari kereta.'
    },
    {
        type: 'dialogue',
        character: 'Ramalia',
        sprite: 'ramalia/normal.png', // Path ke sprite Ramalia
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
        sprite: 'azain/kaget_khawatir.png', // Path ke sprite Azain
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
    // --- CABANG CERITA: RAMAH ---
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
        text: '(Dia tersenyum. Manis sekali.)'
    },
    { type: 'end' }, // Akhir dari cabang ini
    // --- CABANG CERITA: JUTEK ---
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
    { type: 'end' } // Akhir dari cabang ini
];


// =================================================================================
// FUNGSI INTI GAME
// =================================================================================

// Fungsi untuk menampilkan adegan berdasarkan index dari storyScript
function displayScene(index) {
    const scene = storyScript[index];

    // Bersihkan layar dari sprite sebelumnya (jika ada)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Selalu gambar background utama
    if (assets['bg_stasiun.png']) {
        ctx.drawImage(assets['bg_stasiun.png'], 0, 0, canvas.width, canvas.height);
    }
    
    // Sembunyikan semua UI dulu
    dialogueBox.classList.add('hidden');
    choicesBox.classList.add('hidden');

    if (scene.type === 'dialogue') {
        dialogueBox.classList.remove('hidden');

        // Tampilkan sprite karakter
        if (scene.sprite && assets[scene.sprite]) {
             // Menggambar sprite di tengah
             const sprite = assets[scene.sprite];
             const spriteWidth = sprite.width * 2.5; // Perbesar ukuran sprite
             const spriteHeight = sprite.height * 2.5;
             const x = (canvas.width - spriteWidth) / 2;
             const y = (canvas.height - spriteHeight) / 2 - 50; // Sedikit ke atas
             ctx.drawImage(sprite, x, y, spriteWidth, spriteHeight);
        }
       
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
                // Cari scene dengan ID yang sesuai dengan target pilihan
                const targetIndex = storyScript.findIndex(s => s.id === choice.target);
                if(targetIndex !== -1) {
                    currentSceneIndex = targetIndex;
                    displayScene(currentSceneIndex);
                } else {
                    console.error('Target scene not found:', choice.target);
                }
            };
            choicesBox.appendChild(button);
        });
    }
    else if (scene.type === 'end') {
        dialogueBox.classList.remove('hidden');
        characterName.textContent = "SYSTEM";
        dialogueText.textContent = "Adegan ini berakhir. (Lanjutan belum dibuat)";
    }
}

// Fungsi untuk maju ke adegan selanjutnya
function nextScene() {
    // Hanya lanjut jika tidak sedang dalam mode memilih
    if (choicesBox.classList.contains('hidden')) {
        currentSceneIndex++;
        if (currentSceneIndex < storyScript.length) {
            displayScene(currentSceneIndex);
        }
    }
}

// =================================================================================
// PEMUAT ASET & INISIALISASI
// =================================================================================

// Daftar semua aset gambar yang perlu dimuat
const assetPaths = [
    'assets/images/backgrounds/bg_stasiun.png',
    'assets/images/sprites/ramalia/normal.png',
    'assets/images/sprites/ramalia/senyum.png',
    'assets/images/sprites/ramalia/kaget.png',
    'assets/images/sprites/azain/senyum.png',
    'assets/images/sprites/azain/kaget_khawatir.png'
];

function startAssetLoader(callback) {
    console.log("Memulai pemuatan aset...");
    let loadedCount = 0;
    
    if (assetPaths.length === 0) {
        callback();
        return;
    }

    assetPaths.forEach(path => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            loadedCount++;
            // Menyimpan gambar yang sudah dimuat ke dalam objek assets
            const key = path.substring(path.lastIndexOf('/') + 1);
            const subfolder = path.substring(path.indexOf('/') + 1, path.lastIndexOf('/'));
            const finalKey = subfolder.replace('assets/images/','') + '/' + key;

            assets[finalKey] = img;
            console.log(`Berhasil memuat: ${path}`);
            if (loadedCount === assetPaths.length) {
                console.log("Semua aset berhasil dimuat!");
                callback();
            }
        };
        img.onerror = () => {
            console.error(`Gagal memuat aset: ${path}`);
        };
    });
}

// --- MULAI GAME ---
// Fungsi utama untuk memulai game setelah semua siap
function startGame() {
    console.log("Game Dimulai!");
    currentSceneIndex = 0;
    displayScene(currentSceneIndex);
    
    // Tambahkan event listener untuk klik
    window.addEventListener('click', (event) => {
        // Cek apakah klik terjadi di dalam tombol pilihan
        if (event.target.classList.contains('choice-button')) {
            return; // Jangan lakukan apa-apa, biarkan onclick tombol yang bekerja
        }
        // Jika tidak, lanjutkan dialog
        nextScene();
    });

    // Tambahkan event listener untuk keyboard
    window.addEventListener('keydown', (event) => {
        if(event.key === ' ' || event.key === 'Enter') {
            nextScene();
        }
    });
}

// Panggil pemuat aset, dan setelah selesai, panggil startGame
startAssetLoader(startGame);