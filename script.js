let ball = document.getElementById("ball");
let hitbox = document.getElementById("hitbox");
let status = document.getElementById("status");
let scoreElement = document.getElementById("score");
let isGameOver = false;
let isGameStarted = false;
let score = 0;
let ballTop = 50;
let ballLeft = 50;
let ballSpeed = 2;
let ballDirection = 1;
let ballHorizontalSpeed = 1;
let fallSpeed = 0.5;
let bounceFactor = 0.7;

// Iniciar el juego
function startGame() {
  if (isGameStarted || isGameOver) return;
  
  isGameStarted = true;
  status.innerText = "Haz clic en el balón para nominarlo.";
  moveBall();
}

// Mover la pelota hacia arriba o abajo
function moveBall() {
  if (isGameOver) return;

  ballTop += fallSpeed * ballDirection;
  ballLeft += ballHorizontalSpeed;

  // Detectar los límites del área para cambiar la dirección horizontal
  if (ballLeft <= 0 || ballLeft >= 100) {
    ballHorizontalSpeed *= -1;
  }

  // Actualizar la posición de la pelota y la hitbox
  hitbox.style.top = `${ballTop}%`;
  hitbox.style.left = `${ballLeft}%`;

  // Si el balón toca el suelo, termina el juego
  if (ballTop >= 90) {
    gameOver();
  } else if (ballTop <= 10) { 
    ballDirection = 1;
    fallSpeed += 0.05;
  }

  if (!isGameOver) {
    setTimeout(moveBall, 10);
  }
}

// Cuando el jugador hace clic en el balón
function nominateBall() {
  if (isGameOver) return;

  if (!isGameStarted) {
    startGame();
  }

  score++;
  scoreElement.innerText = `Puntuación: ${score}`;

  status.innerText = "¡Ball Nomination Exitosa!";

  ballDirection = -1;
  fallSpeed = 0.5;
  ballHorizontalSpeed = Math.random() * 2 - 1;
}

// Fin del juego
function gameOver() {
  status.innerText = "¡Perdiste! El balón tocó el suelo.";
  isGameOver = true;
  hitbox.style.transition = 'none';
}
