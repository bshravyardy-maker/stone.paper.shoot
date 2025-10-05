const choices = document.querySelectorAll('.choice');
const resultMsg = document.getElementById('resultMsg');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const resetBtn = document.getElementById('reset');
const modeSelector = document.querySelectorAll('input[name="mode"]');

let playerScore = 0;
let computerScore = 0;
let mode = "pvc"; // default
let pvpTurn = 1;
let player1Choice = "";
let player2Choice = "";

modeSelector.forEach(radio => {
  radio.addEventListener('change', () => {
    mode = radio.value;
    resetGame();
  });
});

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const currentChoice = choice.dataset.choice;

    if (mode === "pvc") {
      const computerChoice = getComputerChoice();
      const winner = getWinner(currentChoice, computerChoice);
      updateScore(winner);
      showResult(currentChoice, computerChoice, winner);
    } else { // PvP
      if (pvpTurn === 1) {
        player1Choice = currentChoice;
        resultMsg.textContent = "Player 2's turn!";
        pvpTurn = 2;
      } else {
        player2Choice = currentChoice;
        const winner = getWinner(player1Choice, player2Choice);
        updateScorePvP(winner);
        showResultPvP(player1Choice, player2Choice, winner);
        pvpTurn = 1;
      }
    }
  });
});

resetBtn.addEventListener('click', resetGame);

function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  return options[Math.floor(Math.random() * options.length)];
}

function getWinner(p1, p2) {
  if (p1 === p2) return 'draw';
  if (
    (p1 === 'rock' && p2 === 'scissors') ||
    (p1 === 'paper' && p2 === 'rock') ||
    (p1 === 'scissors' && p2 === 'paper')
  ) return 'player';
  return 'computer';
}

function updateScore(winner) {
  if (winner === 'player') playerScore++;
  if (winner === 'computer') computerScore++;
  playerScoreEl.textContent = `Player: ${playerScore}`;
  computerScoreEl.textContent = `Computer: ${computerScore}`;
}

function updateScorePvP(winner) {
  if (winner === 'player') playerScore++;
  if (winner === 'computer') computerScore++;
  playerScoreEl.textContent = `Player 1: ${playerScore}`;
  computerScoreEl.textContent = `Player 2: ${computerScore}`;
}

function showResult(player, computer, winner) {
  if (winner === 'draw') {
    resultMsg.textContent = `It's a Draw! You both chose ${player}.`;
  } else if (winner === 'player') {
    resultMsg.textContent = `You Win! ${player} beats ${computer}.`;
  } else {
    resultMsg.textContent = `You Lose! ${computer} beats ${player}.`;
  }
}

function showResultPvP(p1, p2, winner) {
  if (winner === 'draw') {
    resultMsg.textContent = `Draw! Player 1: ${p1} | Player 2: ${p2}`;
  } else if (winner === 'player') {
    resultMsg.textContent = `Player 1 wins! ${p1} beats ${p2}`;
  } else {
    resultMsg.textContent = `Player 2 wins! ${p2} beats ${p1}`;
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  pvpTurn = 1;
  player1Choice = "";
  player2Choice = "";
  playerScoreEl.textContent = mode === "pvc" ? "Player: 0" : "Player 1: 0";
  computerScoreEl.textContent = mode === "pvc" ? "Computer: 0" : "Player 2: 0";
  resultMsg.textContent = "Make your move!";
}
