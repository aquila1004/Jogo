const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");

const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageButton = document.querySelector("[data-winning-message-button]");

let isCircleTurn;

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

const startGame = () => {
    for(const cell of cellElements){
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.addEventListener("click", handleCellClick, {once: true});
    }
    isCircleTurn = false;
    board.classList.add("x");
    winningMessage.classList.remove("show-winning-message");

}
const endGame = (isDraw) => {
    if(isDraw){
        winningMessageTextElement.innerText = "EMPATE";
    }
    else{
        winningMessageTextElement.innerText = isCircleTurn ? "O venceu" : "X venceu";

    }
    winningMessage.classList.add("show-winning-message");

}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
}

const checkForDraw = () => {
   return[...cellElements].every(cell => {
    return cell.classList.contains("circle") || cell.classList.contains("x");
   });
}
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);

}
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }

}
const handleCellClick = (e) => {
    //colocar a marca (x ou circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle": "x";
   placeMark(cell, classToAdd);
   
 
    // verificar por vitoria
    const isDraw = checkForDraw();
    const isWin = checkForWin(classToAdd);
    if (isWin) {
       endGame(false);
    }else if(isDraw)
    {
        endGame(true);
    }
    else{
        swapTurns();
    }
}
startGame();

winningMessageButton.addEventListener("click", startGame);

