function saveHighscore(name, score, difficulty) {
  const scores = JSON.parse(localStorage.getItem('snakeHighscores')) || [];
  scores.push({ name, score, difficulty });
  localStorage.setItem('snakeHighscores', JSON.stringify(scores));
}
