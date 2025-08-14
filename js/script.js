// =================================================================================
// KISAH CINTA DI EDINBURGH - A SIMPLE VISUAL NOVEL ENGINE
// Dibuat dengan Clean Code dan komentar untuk kemudahan belajar.
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
// 3. SCRIPT CERITA (NASKAH GAME)
// =================================================================================
// Ini adalah "naskah" game Anda. Setiap objek adalah satu baris dialog atau event.
// Anda bisa dengan mudah menambah atau mengubah cerita hanya dengan mengedit bagian ini.
const storyScript = [
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
        type: 'choice', // Tipe adegan ini adalah pilihan
        choices: [
            { text: 'Perkenalkan diri dengan ramah.', target: 'perkenalan_ramah' },
            { text: 'Jawab dengan sedikit jutek.', target: 'perkenalan_jutek' }
        ]
    },
    // --- CABANG CERITA ---
    {
        id: 'perkenalan_ramah', // ID ini harus cocok dengan 'target' dari pilihan
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
    { type: 'end' },

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
        // Jika tidak ada background baru, gambar background sebelumnya
        const prevSceneWithBg = storyScript.slice(0, index).reverse().find(s => s.background);
        if (prevSceneWithBg && assets[prevSceneWithBg.background]) {
            ctx.drawImage(assets[prevSceneWithBg.background], 0, 0, canvas.width, canvas.height);
        }
    }

    // Tampilkan sprite karakter jika ada di script
    if (scene.sprite && assets[scene.sprite]) {
        const sprite = assets[scene.sprite];
        // Atur ukuran dan posisi sprite agar proporsional dan di tengah
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
                }
            };
            choicesBox.appendChild(button);
        });
    }
    else if (scene.type === 'end') {
        dialogueBox.classList.remove('hidden');
        characterName.textContent = "SYSTEM";
        dialogueText.textContent = "Adegan ini berakhir. Terima kasih sudah bermain!";
    }
}

/**
 * Fungsi untuk maju ke adegan selanjutnya, dipicu oleh klik atau keyboard.
 */
function nextScene() {
    // Fungsi ini hanya boleh berjalan jika tidak ada pilihan yang sedang ditampilkan
    if (!choicesBox.classList.contains('hidden')) {
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

// Daftar semua path aset gambar yang perlu dimuat.
const assetPaths = [
    'assets/images/backgrounds/bg_stasiun.png',
    'assets/images/sprites/ramalia/normal.png',
    'assets/images/sprites/ramalia/senyum.png',
    'assets/images/sprites/ramalia/kaget.png',
    'assets/images/sprites/ramalia/malu.png',
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

    assetPaths.forEach(path => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            loadedCount++;
            // Menyimpan gambar yang sudah dimuat ke dalam objek assets dengan nama file sebagai key
            const key = path.substring(path.lastIndexOf('/') + 1);
            assets[key] = img;
            console.log(`Berhasil memuat: ${path}`);
            if (loadedCount === assetPaths.length) {
                console.log("Semua aset berhasil dimuat!");
                callback(); // Panggil fungsi startGame jika semua sudah selesai
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
    // Ini cara yang lebih baik untuk menghindari konflik dengan tombol
    document.getElementById('game-container').addEventListener('click', (event) => {
        // Cek jika yang diklik BUKAN tombol pilihan
        if (!event.target.classList.contains('choice-button')) {
            nextScene();
        }
    });

    // Menambahkan event listener untuk keyboard (Spasi atau Enter)
    window.addEventListener('keydown', (event) => {
        if(event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); // Mencegah spasi melakukan scroll halaman
            nextScene();
        }
    });
}

// --- Mulai prosesnya! ---
// Panggil pemuat aset, dan setelah selesai, ia akan memanggil `startGame`.
startAssetLoader(startGame);