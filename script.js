let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const boxs = document.querySelectorAll('.box');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-button');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


boxs.forEach(box => {
    box.addEventListener('click', handleCellClick);
});


function handleCellClick(event) {
    const clickedIndex = event.target.dataset.cellIndex;

    if (gameBoard[clickedIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[clickedIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkForWinner();
    togglePlayer();
}


function checkForWinner() {
    let winnerFound = false;

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winnerFound = true;
            endGame(gameBoard[a]);
            break;
        }
    }

    if (!gameBoard.includes('') && !winnerFound) {
        endGame('dono ek jaiseho!!!!!');
    }
}


function endGame(winner) {
    gameActive = false;

    if (winner === 'dono ek jaiseho!!!!!') {
        statusDisplay.textContent = 'wah dono ek jaiseho!!!!!';
    } else {
        statusDisplay.textContent = `${winner} jeet gaye bhaiyaaa jeet gaye`;
    }
}


function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


restartButton.addEventListener('click', restartGame);

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = '';
    
    boxs.forEach(box => {
        box.textContent = '';
    });
}
