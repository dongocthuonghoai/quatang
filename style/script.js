let explosionIcon = "💗";
let isGifting = false;
let giftInterval = null;
let isMessaging = false;
let messageInterval = null;
let currentImage = 1;
const totalImage = 35;
let messages = [
        "8/3 vui vẻ nhé",
        "Đỗ NV1! Đỗ NV1! Đỗ NV1! ",
        "Girl D14 hiên ngang mà bước ",
        "NO PAIN NO GAIN ",
        "8/3 xin chúc chị em quà ngập túi, tình đầy tim",
        "Bạn là nhất khi là chính bạn",
        "Thăng hạng nhan sắc, Thăng tiến tiền tài"
];

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const giftBtn = document.getElementById("giftBtn");
const messageBtn = document.getElementById("messageBtn");
const menuTrigger = document.getElementById("menuTrigger");
const menuOptions = document.getElementById("menuOptions");
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const iconInput = document.getElementById("iconInput");
const messageInput = document.getElementById("messageInput");
const saveIconBtn = document.getElementById("saveIcon");
const closeModalBtn = document.getElementById("closeModal");
const popSound = document.getElementById("popSound");

const introOverlay = document.getElementById("introOverlay");
const mainContent = document.getElementById("mainContent");

// Helper to play pop sound
function playPopSound() {
        if (popSound) {
                popSound.currentTime = 0;
                popSound.play().catch(err => console.log("Sound play blocked"));
        }
}

// Start Experience
function startExperience() {
        playPopSound();
        introOverlay.classList.add("fade-out");
        mainContent.classList.remove("hidden");
        document.body.classList.remove("container"); // Start flowers animation

        // Auto play music
        bgMusic.play().then(() => {
                musicBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
        }).catch(err => console.log("Music play blocked"));

        // Remove overlay from DOM after fade
        setTimeout(() => {
                introOverlay.remove();
        }, 1000);
}

introOverlay.addEventListener("click", startExperience);
introOverlay.addEventListener("touchstart", (e) => {
        startExperience();
        if (e.cancelable) e.preventDefault();
});

// Auto play music on first interaction
function autoPlayMusic() {
        if (bgMusic.paused) {
                bgMusic.play().then(() => {
                        musicBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
                }).catch(err => {
                        console.log("Browser blocked autoplay. Waiting for user interaction.");
                });
        }
}

// Toggle Menu function
function toggleMenu(e) {
        e.stopPropagation();
        playPopSound();
        menuOptions.classList.toggle("active");
        autoPlayMusic(); // Play music when clicking menu trigger
}

menuTrigger.addEventListener("click", toggleMenu);
menuTrigger.addEventListener("touchstart", (e) => {
        toggleMenu(e);
        if (e.cancelable) e.preventDefault();
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
        if (!e.target.closest(".menu-container")) {
                menuOptions.classList.remove("active");
        }
});

// Music Control
function toggleMusic(e) {
        e.stopPropagation();
        playPopSound();
        if (bgMusic.paused) {
                bgMusic.play().catch(err => console.log("Music play blocked by browser."));
                musicBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
        } else {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
        }
}

musicBtn.addEventListener("click", toggleMusic);
musicBtn.addEventListener("touchstart", (e) => {
        toggleMusic(e);
        if (e.cancelable) e.preventDefault();
});

// Gift Control (Falling Images - Continuous)
function toggleFallingImages(e) {
        e.stopPropagation();
        playPopSound();
        isGifting = !isGifting;

        if (isGifting) {
                giftBtn.classList.add("active");
                createFallingImage();
                giftInterval = setInterval(createFallingImage, 1000);
        } else {
                giftBtn.classList.remove("active");
                clearInterval(giftInterval);
        }

        menuOptions.classList.remove("active");
}

function createFallingImage() {
        if (!isGifting) return;

        const img = document.createElement("img");
        img.src = `./style/img/Anh (${currentImage}).jpg`;
        currentImage++;
        if (currentImage > totalImage) {
                currentImage = 1;
        }
        img.className = "falling-image";

        const width = window.innerWidth;
        const size = width < 600 ? Math.random() * 145 + 150 : Math.random() * 155 + 155;
        const startX = Math.random() * (width - size);
        const duration = Math.random() * 4 + 4;

        img.style.left = startX + "px";
        img.style.width = size + "px";
        img.style.height = "auto";
        img.style.animationDuration = duration + "s";

        document.body.appendChild(img);

        setTimeout(() => {
                img.remove();
        }, duration * 1000);
}

giftBtn.addEventListener("click", toggleFallingImages);
giftBtn.addEventListener("touchstart", (e) => {
        toggleFallingImages(e);
        if (e.cancelable) e.preventDefault();
});

// Message Control (Falling Text - Continuous)
function toggleFallingMessages(e) {
        e.stopPropagation();
        playPopSound();
        isMessaging = !isMessaging;

        if (isMessaging) {
                messageBtn.classList.add("active");
                createFallingMessage();
                messageInterval = setInterval(createFallingMessage, 1500); // 1.5s per message
        } else {
                messageBtn.classList.remove("active");
                clearInterval(messageInterval);
        }

        menuOptions.classList.remove("active");
}

function createFallingMessage() {
        if (!isMessaging) return;

        const msgDiv = document.createElement("div");
        msgDiv.className = "falling-message";
        msgDiv.innerText = messages[Math.floor(Math.random() * messages.length)];

        // Cute color palette
        const colors = [
                { text: "#ff69b4", border: "#ffb6c1" }, // Pink
                { text: "#9370db", border: "#e6e6fa" }, // Purple
                { text: "#40e0d0", border: "#afeeee" }, // Turquoise
                { text: "#ff8c00", border: "#ffe4b5" }, // Orange
                { text: "#20b2aa", border: "#e0ffff" }, // Light Sea Green
                { text: "#ff1493", border: "#ffc0cb" }  // Deep Pink
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const width = window.innerWidth;
        const padding = 20;
        const startX = Math.random() * (width - 330 - padding * 2) + padding;
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const fontSize = width < 600 ? Math.random() * 10 + 25 : Math.random() * 16 + 25;

        msgDiv.style.left = Math.max(padding, startX) + "px";
        msgDiv.style.fontSize = fontSize + "px";
        msgDiv.style.color = randomColor.text;
        msgDiv.style.borderColor = randomColor.border;
        msgDiv.style.animationDuration = duration + "s";

        document.body.appendChild(msgDiv);

        setTimeout(() => {
                msgDiv.remove();
        }, duration * 1000);
}

messageBtn.addEventListener("click", toggleFallingMessages);
messageBtn.addEventListener("touchstart", (e) => {
        toggleFallingMessages(e);
        if (e.cancelable) e.preventDefault();
});

// Settings Modal
function openSettings(e) {
        e.stopPropagation();
        playPopSound();
        settingsModal.classList.add("active");
        iconInput.value = explosionIcon;
        messageInput.value = messages.join(", ");
        menuOptions.classList.remove("active");
}

settingsBtn.addEventListener("click", openSettings);
settingsBtn.addEventListener("touchstart", (e) => {
        openSettings(e);
        if (e.cancelable) e.preventDefault();
});

closeModalBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playPopSound();
        settingsModal.classList.remove("active");
});

saveIconBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playPopSound();
        // Save Explosion Icons
        if (iconInput.value.trim() !== "") {
                explosionIcon = iconInput.value.trim();
        }
        // Save Custom Messages
        if (messageInput.value.trim() !== "") {
                messages = messageInput.value.split(",").map(msg => msg.trim()).filter(msg => msg !== "");
        }
        settingsModal.classList.remove("active");
});

settingsModal.addEventListener("click", (e) => {
        if (e.target === settingsModal) {
                settingsModal.classList.remove("active");
        }
});

document.querySelector(".modal-content").addEventListener("click", (e) => {
        e.stopPropagation();
});

// Explosion Effect + Auto Play
document.addEventListener("click", (e) => {
        autoPlayMusic(); // Play music on any click
        playPopSound();

        if (e.target.closest(".menu-container") || e.target.closest(".modal-content")) return;
        if (settingsModal.classList.contains("active")) return;

        createHearts(e.clientX, e.clientY);
});

document.addEventListener("touchstart", (e) => {
        autoPlayMusic(); // Play music on any touch
        playPopSound();

        if (e.target.closest(".menu-container") || e.target.closest(".modal-content")) return;
        if (settingsModal.classList.contains("active")) return;

        createHearts(e.touches[0].clientX, e.touches[0].clientY);
});

function createHearts(x, y) {
        const numHearts = 15;
        const icons = Array.from(explosionIcon).filter(char => char.trim() !== "");

        for (let i = 0; i < numHearts; i++) {
                const heart = document.createElement("div");
                heart.innerHTML = icons[Math.floor(Math.random() * icons.length)] || "💗";
                heart.className = "heart";

                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 150;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;

                heart.style.setProperty("--x", dx);
                heart.style.setProperty("--y", dy);
                heart.style.left = x + "px";
                heart.style.top = y + "px";
                heart.style.fontSize = Math.random() * 20 + 10 + "px";
                heart.style.setProperty("--r", Math.random() * 360 - 180 + "deg");

                document.body.appendChild(heart);

                setTimeout(() => {
                        heart.remove();
                }, 1000);
        }
}
