document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const playerXWinsDisplay = document.getElementById('playerXWins');
    const playerOWinsDisplay = document.getElementById('playerOWins');
    const resultDisplay = document.querySelector('.result');
    const newGameBtn = document.getElementById('newGameBtn');
    const resetScoreBtn = document.getElementById('resetScoreBtn');
    const backBtn = document.getElementById('backBtn');

    let currentPlayer = 'X';
    let huPlayer = 'X';
    let aiPlayer = 'O';
    let gameActive = true;
    let playerXWins = 0;
    let playerOWins = 0;
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    let board = ['', '', '', '', '', '', '', '', ''];

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    newGameBtn.addEventListener('click', startNewGame);
    resetScoreBtn.addEventListener('click', resetScore);
    backBtn.addEventListener('click', () => {
        window.history.back();
    });

    function handleClick(e) {
        const cell = e.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (board[cellIndex] === '' && gameActive) {
            board[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;

            checkResult();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            resultDisplay.children[0].textContent = `Current Player: ${currentPlayer}`;

            if (currentPlayer === 'O' && gameActive) {
                makeAIMove();
            }
        }
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
        currentPlayer === 'X' ? playerXWins++ : playerOWins++;
        playerXWinsDisplay.textContent = playerXWins;
        playerOWinsDisplay.textContent = playerOWins;
    }

    function startNewGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
            cell.style.backgroundColor = '';
        });
        currentPlayer = 'X';
        gameActive = true;
        resultDisplay.children[0].textContent = `Current Player: ${currentPlayer}`;
        resultDisplay.children[1].textContent = 'Game Result';

        if (currentPlayer === 'O') {
            makeAIMove();
        }
    }

    function resetScore() {
        playerXWins = 0;
        playerOWins = 0;
        playerXWinsDisplay.textContent = playerXWins;
        playerOWinsDisplay.textContent = playerOWins;
    }

    function isWinner(board, player) {
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    }

    function bestSpot() {
        function emptyCells(board) {
            return board.map((cell, index) => cell === '' ? index : '').filter(String);
        }

        const availableSpots = emptyCells(board);

        console.log('Board:', board);
        console.log('Available spots:', availableSpots);

        function minimax(newBoard, player) {
            let availableSpots = emptyCells(newBoard);

            if (isWinner(newBoard, huPlayer)) {
                return { score: -10 };
            } else if (isWinner(newBoard, aiPlayer)) {
                return { score: 10 };
            } else if (availableSpots.length === 0) {
                return { score: 0 };
            }

            let moves = [];

            for (let i = 0; i < availableSpots.length; i++) {
                let move = {};
                move.index = availableSpots[i];
                newBoard[availableSpots[i]] = player;

                if (player === aiPlayer) {
                    let result = minimax(newBoard, huPlayer);
                    move.score = result.score;
                } else {
                    let result = minimax(newBoard, aiPlayer);
                    move.score = result.score;
                }

                newBoard[availableSpots[i]] = ''; // Reset the spot after evaluation
                moves.push(move);
            }

            let bestMove;
            if (player === aiPlayer) {
                let bestScore = -Infinity;
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score > bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score < bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }

            return moves[bestMove]; // Return the best move object
        }

        let bestMove = minimax(board, aiPlayer).index;
        console.log('Best Move:', bestMove);

        if (bestMove === undefined || bestMove === null) {
            const randomIndex = Math.floor(Math.random() * availableSpots.length);
            return availableSpots[randomIndex];
        }

        return bestMove;
    }

    function makeAIMove() {
        let bestMove = bestSpot();
        board[bestMove] = aiPlayer;
        cells[bestMove].textContent = aiPlayer;

        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        resultDisplay.children[0].textContent = `Current Player: ${currentPlayer}`;
    }
    startNewGame();
});