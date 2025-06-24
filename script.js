document.addEventListener('DOMContentLoaded', () => {
    const hiddenItems = document.querySelectorAll('.hidden-item');
    const foundCountSpan = document.getElementById('foundCount');
    const clueDisplay = document.getElementById('clueDisplay');
    const finalGiftSection = document.getElementById('finalGift');
    const itemFoundSound = document.getElementById('itemFoundSound');
    const giftRevealSound = document.getElementById('giftRevealSound');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playGiftSoundButton = document.getElementById('playGiftSound');

    let foundItems = 0;
    const totalItems = hiddenItems.length;

    // Kumpulan clue untuk setiap item
    const clues = {
        clue1: "Clue 1: Aku ada di setiap impian kita, di balik senyum paling manis.",
        clue2: "Clue 2: Aku sekecil Woodstock, tapi kekuatanku besar, seperti rasa sayangku.",
        clue3: "Clue 3: Aku tulang punggung dari kebahagiaan kita, selalu mendukungmu.",
        clue4: "Clue 4: Aku seperti kaus Charlie Brown, selalu ada, meski kadang tersembunyi.",
        clue5: "Clue 5: Aku tempat Snoopy merenung, di mana banyak kenangan indah kita tercipta.",
        clue6: "Clue 6: Aku menuliskan semua perasaanku, setiap kata adalah cintaku padamu."
    };

    // Inisialisasi particles.js (untuk efek salju)
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff" // Warna partikel (putih untuk salju)
            },
            "shape": {
                "type": "circle", // Bentuk partikel
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false // Tidak ada garis penghubung antar partikel
            },
            "move": {
                "enable": true,
                "speed": 3, // Kecepatan gerakan partikel
                "direction": "bottom", // Arah gerakan (misal: salju jatuh ke bawah)
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false // Tidak ada interaksi saat hover
                },
                "onclick": {
                    "enable": false // Tidak ada interaksi saat klik
                },
                "resize": true
            }
        },
        "retina_detect": true
    });

    // Otomatis putar musik latar saat halaman dimuat (mungkin diblokir browser, lihat catatan di bawah)
    // backgroundMusic.play().catch(e => console.log("Autoplay blocked:", e));

    // Tambahkan tombol mute/play musik latar
    const musicControl = document.createElement('div');
    musicControl.classList.add('music-control');
    musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Ikon mute
    document.body.appendChild(musicControl);

    let isMusicPlaying = false; // Status awal

    musicControl.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Ubah ikon ke mute
        } else {
            backgroundMusic.play().catch(e => console.log("Play failed:", e));
            musicControl.innerHTML = '<i class="fas fa-volume-up"></i>'; // Ubah ikon ke volume up
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Play background music setelah interaksi pertama (misal klik item)
    // Alternatif: play saat user click start button jika ada, atau tambahkan tombol play
    // Misalnya, tambahkan ini di event listener item.click:
    let firstInteractionDone = false;
    hiddenItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('found')) {
                if (!firstInteractionDone) {
                    backgroundMusic.play().catch(e => console.log("Autoplay after interaction blocked:", e));
                    musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                    isMusicPlaying = true;
                    firstInteractionDone = true;
                }

                item.classList.add('found');
                foundItems++;
                foundCountSpan.textContent = foundItems;

                itemFoundSound.currentTime = 0; // Reset suara jika dimainkan lagi
                itemFoundSound.play(); // Mainkan suara saat item ditemukan

                const clueKey = item.dataset.clue;
                clueDisplay.textContent = clues[clueKey];
                clueDisplay.classList.add('show');

                setTimeout(() => {
                    clueDisplay.classList.remove('show');
                }, 3000);

                if (foundItems === totalItems) {
                    setTimeout(() => {
                        finalGiftSection.classList.add('show-gift');
                        finalGiftSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        giftRevealSound.play(); // Mainkan suara kejutan hadiah
                        // Opsional: Hentikan musik latar setelah hadiah muncul
                        // backgroundMusic.pause();
                        // musicControl.style.display = 'none'; // Sembunyikan kontrol musik
                    }, 1000);
                }
            }
        });
    });

    // Event listener untuk tombol suara kejutan di hadiah akhir
    playGiftSoundButton.addEventListener('click', () => {
        // Ganti dengan efek suara atau lagu lain jika mau
        // Misalnya, putar lagu favorit pacarmu
        backgroundMusic.currentTime = 0; // Mulai dari awal
        backgroundMusic.play().catch(e => console.log("Play failed on button click:", e));
        alert('Selamat menikmati kejutan dari Snoopy dan aku!'); // Atau tampilkan sesuatu yang lain
    });
});