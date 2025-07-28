// Game sequences
let gameSeq = [];
let userSeq = [];

// Color options
const colors = ["yellow", "red", "purple", "green"];

// Game state
let started = false;
let level = 0;

// DOM elements
const h2 = document.querySelector("h2");
const highScoreText = document.getElementById("high-score");

// Load or set high score
let highScore = localStorage.getItem("highScore") || 0;
highScoreText.textContent = `Highest Score: ${highScore}`;

// Start game on key press
document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

// Flash button for game sequence
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

// Flash button for user click
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

// Generate new color in sequence
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  const randIdx = Math.floor(Math.random() * 4);
  const randColor = colors[randIdx];
  const randBtn = document.getElementById(randColor);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

// Check user's latest input
function checkAnswer(currentIdx) {
  if (userSeq[currentIdx] === gameSeq[currentIdx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 150);

    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      highScoreText.textContent = `Highest Score: ${highScore}`;
    }

    resetGame();
  }
}

// Handle user button clicks
function handleUserClick() {
  const userColor = this.id;
  userSeq.push(userColor);
  userFlash(this);
  checkAnswer(userSeq.length - 1);
}

// Add click listeners to all buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", handleUserClick);
});

// Reset game values
function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
