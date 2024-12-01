const fields = document.querySelectorAll(".field");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle a player click
const handleClick = (index) => {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  fields[index].classList.add(`field-${currentPlayer.toLowerCase()}`);
  fields[index].textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    message.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer} Turn`;
};

// Check if the current player wins
const checkWin = () => {
  return winningCombos.some((combo) =>
    combo.every((index) => board[index] === currentPlayer)
  );
};

// Reset the game
const resetGame = () => {
  currentPlayer = "X";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  fields.forEach((field) => {
    field.textContent = "";
    field.classList.remove("field-x", "field-o");
  });
  message.textContent = "Player X Turn";
};

// Add event listeners
fields.forEach((field, index) => {
  field.addEventListener("click", () => handleClick(index));
});
restartBtn.addEventListener("click", resetGame);
