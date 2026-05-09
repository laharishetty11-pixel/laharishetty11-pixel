// script.js

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let gameMode = "player";

let gameState = ["", "", "", "", "", "", "", "", ""];

let xScore = 0;
let oScore = 0;

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick() {
  const index = this.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if (gameMode === "ai" && gameActive && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function makeMove(index, player) {
  gameState[index] = player;
  cells[index].textContent = player;

  checkWinner();
}

function aiMove() {
  let emptyCells = gameState
    .map((value, index) => value === "" ? index : null)
    .filter(value => value !== null);

  let randomIndex =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];

  makeMove(randomIndex, "O");
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    let [a, b, c] = condition;

    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;

    if (currentPlayer === "X") {
      xScore++;
      document.getElementById("xScore").textContent = xScore;
    } else {
      oScore++;
      document.getElementById("oScore").textContent = oScore;
    }

    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "🤝 Match Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;

  gameState = ["", "", "", "", "", "", "", "", ""];

  statusText.textContent = "Player X's Turn";

  cells.forEach(cell => {
    cell.textContent = "";
  });
}

function setMode(mode) {
  gameMode = mode;
  restartGame();

  if (mode === "ai") {
    statusText.textContent = "Play Against AI 🤖";
  } else {
    statusText.textContent = "2 Player Mode 👥";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}