const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 200, y: 200 }];
let dx = 20;
let dy = 0;
let food = getRandomPosition();
let bonus = null;
let obstacles = generateObstacles(5);
let score = 0;
let interval;
let soundInitialized = false;

const playerName = localStorage.getItem("snakePlayerName") || "Tuntematon";
const difficulty = localStorage.getItem("snakeDifficulty") || "normal";
const speed = { easy: 200, normal: 120, hard: 80 }[difficulty];

// 🎧 Äänitehosteet
const eatSound = new Audio("sounds/eat.mp3");
const bonusSound = new Audio("sounds/bonus.mp3");
const gameOverSound = new Audio("sounds/gameover.mp3");

// Äänien lataus ja testaus
function initSounds() {
    const sounds = [eatSound, bonusSound, gameOverSound];
    sounds.forEach(sound => {
        sound.load();
        sound.volume = 0.3;  // Säädä äänenvoimakkuutta (0.0 - 1.0)
    });
}

document.getElementById("playerInfo").textContent = `Pelaaja: ${playerName}`;
document.addEventListener("keydown", changeDirection);

// Käynnistä pelisilmukka
interval = setInterval(gameLoop, speed);

// Ajoittainen bonushedelmä
setInterval(() => {
  bonus = Math.random() < 0.5 ? getRandomPosition() : null;
}, 5000);

function gameLoop() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (isCollision(head)) return endGame();

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    eatSound.play();
    document.getElementById("score").textContent = score;
    food = getRandomPosition();
  } else if (bonus && head.x === bonus.x && head.y === bonus.y) {
    score += 5;
    bonusSound.play();
    bonus = null;
    document.getElementById("score").textContent = score;
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach(part => drawRect(part, "green"));
  drawRect(food, "red");
  if (bonus) drawRect(bonus, "gold");
  obstacles.forEach(obs => drawRect(obs, "gray"));
}

function drawRect(pos, color) {
  ctx.fillStyle = color;
  ctx.fillRect(pos.x, pos.y, 20, 20);
}

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20
  };
}

function generateObstacles(count) {
  const obs = [];
  for (let i = 0; i < count; i++) obs.push(getRandomPosition());
  return obs;
}

function isCollision(pos) {
  return (
    pos.x < 0 || pos.x >= canvas.width ||
    pos.y < 0 || pos.y >= canvas.height ||
    snake.some(s => s.x === pos.x && s.y === pos.y) ||
    obstacles.some(o => o.x === pos.x && o.y === pos.y)
  );
}

function changeDirection(e) {
  // ⚠️ Ensimmäinen painallus poistaa autoplay-eston
  if (!soundInitialized) {
    initSounds();
    soundInitialized = true;
  }

  const key = e.key;
  if (key === "ArrowUp" && dy === 0) [dx, dy] = [0, -20];
  else if (key === "ArrowDown" && dy === 0) [dx, dy] = [0, 20];
  else if (key === "ArrowLeft" && dx === 0) [dx, dy] = [-20, 0];
  else if (key === "ArrowRight" && dx === 0) [dx, dy] = [20, 0];
}

function endGame() {
  clearInterval(interval);
  gameOverSound.play();
  saveHighscore(playerName, score, difficulty); // Lisää difficulty parametri
  setTimeout(() => {
    alert(`Peli ohi! Pisteet: ${score}`);
    window.location.href = "highscores.html";
  }, 500);
}
