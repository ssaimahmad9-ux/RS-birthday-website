// ---------------- ELEMENTS ----------------
const revealBtn = document.getElementById("revealBtn");
const specialBtn = document.getElementById("specialBtn");
const letterContainer = document.getElementById("letterContainer");
const mainContent = document.getElementById("mainContent");
const closeLetter = document.getElementById("closeLetter");

const videoOverlay = document.getElementById("videoOverlay");
const closeVideo = document.getElementById("closeVideo");
const specialIframe = document.getElementById("specialIframe");

const song1 = document.getElementById("song1");
const birthdayText = document.getElementById("birthdayText");

let balloons = [];
let confettis = [];
let balloonInterval;
let confettiInterval;

// ---------------- OPEN LETTER ----------------
revealBtn.addEventListener("click", () => {
    mainContent.style.display = "none";
    letterContainer.style.display = "flex";

    // Play song
    song1.currentTime = 0;
    song1.play().catch(() => {});

    // Start celebrations
    startBalloons(10);
    startConfetti(15);
});

// ---------------- CLOSE LETTER ----------------
closeLetter.addEventListener("click", () => {
    letterContainer.style.display = "none";
    mainContent.style.display = "flex";

    song1.pause();
    song1.currentTime = 0;

    stopCelebrations();
});

// ---------------- OPEN VIDEO ----------------
specialBtn.addEventListener("click", () => {
    song1.pause();
    song1.currentTime = 0;

    mainContent.style.display = "none";
    videoOverlay.style.display = "flex";

    // Start confetti while video is open
    startConfetti(15000);
});

// ---------------- CLOSE VIDEO ----------------
closeVideo.addEventListener("click", () => {
    // Hide overlay
    videoOverlay.style.display = "none";
    mainContent.style.display = "flex";

    // Stop video by resetting iframe src
    const src = specialIframe.src;
    specialIframe.src = src;

    stopCelebrations();
});

// ---------------- CELEBRATIONS ----------------
function startBalloons(countPerSecond) {
    balloonInterval = setInterval(() => {
        createBalloon();
    }, 1000 / countPerSecond);
}

function startConfetti(countPerSecond) {
    confettiInterval = setInterval(() => {
        createConfetti();
    }, 1000 / 50000000);
}

function stopCelebrations() {
    clearInterval(balloonInterval);
    clearInterval(confettiInterval);

    balloons.forEach(b => b.remove());
    confettis.forEach(c => c.remove());
    balloons = [];
    confettis = [];
}

// ---------------- CREATE BALLOON ----------------
function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    const w = 30 + Math.random() * 40;
    balloon.style.width = `${w}px`;
    balloon.style.height = `${w * 1.5}px`;
    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.backgroundColor = getRandomColor();
    balloon.style.animationDuration = `${5 + Math.random() * 5}s`;

    const string = document.createElement("div");
    string.classList.add("string");
    balloon.appendChild(string);

    if (Math.random() < 0.4) {
        balloon.style.cursor = "pointer";
        balloon.addEventListener("click", () => popBalloon(balloon));
    }

    document.body.appendChild(balloon);
    balloons.push(balloon);

    balloon.addEventListener("animationend", () => {
        balloon.remove();
        balloons = balloons.filter(b => b !== balloon);
    });
}

// ---------------- POP BALLOON ----------------
function popBalloon(balloon) {
    balloon.style.animation = "none";

    const popSound = new Audio("pop.mp3");
    popSound.play().catch(() => {});

    balloon.style.transition = "all 0.2s ease-out";
    balloon.style.transform = "scale(0)";
    balloon.style.opacity = "0";

    setTimeout(() => {
        balloon.remove();
        balloons = balloons.filter(b => b !== balloon);
    }, 200);
}

// ---------------- CREATE CONFETTI ----------------
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
    confetti.style.fontSize = `${12 + Math.random() * 8}px`;
    confetti.textContent = Math.random() < 0.5 ? "★" : "♥";
    confetti.style.color = getRandomColor();

    document.body.appendChild(confetti);
    confettis.push(confetti);

    confetti.addEventListener("animationend", () => {
        confetti.remove();
        confettis = confettis.filter(c => c !== confetti);
    });
}

// ---------------- RANDOM COLORS ----------------
function getRandomColor() {
    const colors = ["#ff0000","#ff7f00","#ffff00","#00ff00","#0000ff","#8b00ff","#ff1493"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ---------------- TYPING TEXT ----------------
const fullText = "Happy Birthday My Love ❤️";
let i = 0;

function typeText() {
    if (i < fullText.length) {
        birthdayText.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeText, 150);
    }
}

// Start typing on page load
window.addEventListener("load", typeText);