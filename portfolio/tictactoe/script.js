document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const resultDisplay = document.querySelector('.result');
  const playerXWinsDisplay = document.getElementById('playerXWins');
  const playerOWinsDisplay = document.getElementById('playerOWins');
  const newGameBtn = document.getElementById('newGameBtn');
  const resetScoreBtn = document.getElementById('resetScoreBtn');
  const backBtn = document.getElementById('backBtn');

  let currentPlayer = 'X';
  let gameActive = true;
  let playerXWins = 0;
  let playerOWins = 0;
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];


  cells.forEach(cell => cell.addEventListener('click', handleClick));
  newGameBtn.addEventListener('click', startNewGame);
  resetScoreBtn.addEventListener('click', resetScore);
  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (cell.textContent !== '' || !gameActive) return;
    cell.textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    resultDisplay.children[0].textContent = `Current Player: ${currentPlayer}`;
  }

  function checkResult() {
    winConditions.forEach(condition => {
      const [a, b, c] = condition;
      if (cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent) {
        gameActive = false;
        cells[a].classList.add('winner');
        cells[b].classList.add('winner');
        cells[c].classList.add('winner');

        cells[a].style.backgroundColor = currentPlayer === 'X' ? 'green' : 'red';
        cells[b].style.backgroundColor = currentPlayer === 'X' ? 'green' : 'red';
        cells[c].style.backgroundColor = currentPlayer === 'X' ? 'green' : 'red';

        resultDisplay.children[1].textContent = `Player ${currentPlayer} wins!`;
        updateWinCount();
        setTimeout(startNewGame, 1000);
      }
    });

    if (!gameActive) return;

    let isDraw = true;
    cells.forEach(cell => {
      if (cell.textContent === '') {
        isDraw = false;
      }
    });

    if (isDraw) {
      gameActive = false;
      cells.forEach(cell => {
        cell.style.backgroundColor = 'blue';
      });
      resultDisplay.children[1].textContent = "It's a draw!";
      setTimeout(startNewGame, 1000);
    }
  }

  function updateWinCount() {
    if (currentPlayer === 'X') {
      playerXWins++;
      playerXWinsDisplay.textContent = playerXWins;
    } else {
      playerOWins++;
      playerOWinsDisplay.textContent = playerOWins;
    }
  }

  function startNewGame() {
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('winner');
      cell.style.backgroundColor = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    resultDisplay.children[0].textContent = `Current Player: ${currentPlayer}`;
    resultDisplay.children[1].textContent = 'Game Result';
  }

  function resetScore() {
    playerXWins = 0;
    playerOWins = 0;
    playerXWinsDisplay.textContent = playerXWins;
    playerOWinsDisplay.textContent = playerOWins;
  }
});

