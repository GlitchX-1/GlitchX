const startScreen = document.querySelector('.start-screen');
const startButton = document.getElementById('start-game');
const gameContainer = document.querySelector('.container');

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
});

const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const gameTitle = document.querySelector('.game-title');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWin = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            highlightWinningCells(pattern);
            return gameBoard[a];
        }
    }
    if (gameBoard.includes('')) return null;
    gameActive = false;
    return 'T';
};

const handleClick = (cell, index) => {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer === 'X' ? 'x-cell' : 'o-cell');
        playSound('move');
        const winner = checkWin();
        if (winner) {
            if (winner === 'T') {
                setMessage("It's a Tie!");
            } else {
                setMessage(`${winner} wins!`);
            }
            showResultScreen();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setMessage(`It's ${currentPlayer}'s turn.`);
        }
    }
};

const highlightWinningCells = (pattern) => {
    for (const index of pattern) {
        cells[index].classList.add('win-cell');
    }
};

const playSound = (soundName) => {
    const audio = new Audio(`sounds/${soundName}.mp3`);
    audio.play();
};

const setMessage = (text) => {
    message.innerText = text;
};

const showResultScreen = () => {
    setTimeout(() => {
        message.style.display = 'none';
        restartBtn.style.display = 'block';
        restartBtn.addEventListener('click', restartGame);
    }, 2000);
};

const restartGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach((cell) => {
        cell.innerText = '';
        cell.classList.remove('x-cell', 'o-cell', 'win-cell');
    });
    message.innerText = "Let's Play!";
    message.style.display = 'block';
    restartBtn.style.display = 'none';
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index));
});

restartBtn.addEventListener('click', restartGame);
