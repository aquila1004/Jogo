/* Selecting the elements with the data-cell, data-board and data-winning-message-text attributes. */
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
);

/* Selecting the elements with the data-winning-message and data-winning-message-button attributes. */
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageButton = document.querySelector(
    "[data-winning-message-button]"
);

let isCircleTurn;

/* An array of arrays that contains the winning combinations. */
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];

/**
 * The startGame function removes the circle and x classes from each cell, adds the click event
 * listener to each cell, and adds the x class to the board.
 */
const startGame = () => {
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.addEventListener("click", handleCellClick, {
            once: true
        });
    }
    //aqui eu defino que o jogador que vence joga primeiro
    for (const winningCombination of winningCombinations) {
        winningCombination.forEach((combination) => {
            if (combination[0] === winningCombination[1]) {
                isCircleTurn = true;
            }
        });
    }

    board.classList.add("x");
    winningMessage.classList.remove("show-winning-message");
};
/**
 * If the game is a draw, the winningMessageTextElement will display "EMPATE", otherwise, if it's the
 * circle's turn, the winningMessageTextElement will display "O venceu", otherwise, the
 * winningMessageTextElement will display "X venceu".
 * @param isDraw - boolean
 */
const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "EMPATE";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ?
            "O venceu" :
            "X venceu";
    }
    winningMessage.classList.add("show-winning-message");
};

/**
 * If any of the winning combinations are true, return true.
 * @param currentPlayer - The current player's symbol.
 * @returns a boolean value.
 */
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

/**
 * If every cell contains either a circle or an x, then return true.
 * @returns The return value is a boolean.
 */
const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("circle") || cell.classList.contains("x");
    });
};
/**
 * Adds a class to a cell.
 * @param cell - the cell that was clicked
 * @param classToAdd - The class to add to the cell.
 */
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};
/**
 * If it's circle's turn, remove the x class and add the circle class. If it's x's turn, remove the
 * circle class and add the x class.
 */
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};
/**
 * It takes a cell, adds a class to it, checks if the game is over, and if not, swaps turns.
 * @param e - the event object
 */
const handleCellClick = (e) => {
    //colocar a marca (x ou circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";
    placeMark(cell, classToAdd);

    // verificar por vitoria
    const isDraw = checkForDraw();
    const isWin = checkForWin(classToAdd);
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurns();
    }
};
startGame();
winningMessageButton.addEventListener("click", startGame);