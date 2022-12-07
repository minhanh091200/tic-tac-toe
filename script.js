const cells = document.querySelectorAll('.square');
const annoucement = document.querySelector('.announcement');
const restartButton = document.querySelector('.restart');

let gameActive = true;
let currentPlayer = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `Player ${currentPlayer} has won`;
const drawMessage = () => 'Issa draw!';
const currentTurn = () => `Player ${currentPlayer}'s turn`;
annoucement.innerHTML = currentTurn();

function playerSwap() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    annoucement.innerHTML = currentTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function resultValidate() {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        annoucement.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        annoucement.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerSwap();
}

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    resultValidate();
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'x';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    annoucement.innerHTML = currentTurn();
    cells.forEach(cell => cell.innerHTML = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
