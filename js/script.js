let score = 0;
let gameOver = false;
let scored = false; // nova flag para controlar pontuação por obstáculo

const scoreElement = document.getElementById("score");
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

const jump = () => {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  // Verifica colisão
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    gameOver = true;

    pipe.style.left = `${pipePosition}px`;
    pipe.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    clearInterval(loop);
  }

  // Quando o cano passa completamente e ainda não pontuou
  if (pipePosition < 0 && !scored && !gameOver) {
    score++;
    scoreElement.textContent = score;
    scored = true;
  }

  // Quando o cano estiver voltando, resetamos o controle de pontuação
  if (pipePosition > 120) {
    scored = false;
  }

}, 10);

document.addEventListener("keydown", jump);
