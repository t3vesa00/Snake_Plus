function saveHighscore(name, score) {
  let highscores = JSON.parse(localStorage.getItem('snakeHighscores')) || [];
  highscores.push({ name, score });
  localStorage.setItem('snakeHighscores', JSON.stringify(highscores));
}
