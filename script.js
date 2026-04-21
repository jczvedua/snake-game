//board
const blockSize = 25;
const rows = 20;
const cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var score = 0;
var gameOver = false;

var highScore = localStorage.getItem("highScore") || 0;
highScore = parseInt(highScore);

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);
}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (gameOver) {
        displayScore();

        context.font = "30pt Calibri";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Game Over", board.width / 2, board.height / 2);
        context.font = "16pt Calibri";

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }

        context.fillText("High Score: " + highScore, board.width / 2, board.height / 2 + 30);
        context.fillText("Press R to Restart", board.width / 2, board.height / 2 + 55);

        return;
    }

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score += 10;
        placeFood();
    }

    for (let i =  snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    displayScore();

    //game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
    }

    for (i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i] || snakeY == snakeBody[i]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "KeyR" && gameOver) {
        resetGame();
        gameOver = false;
    }
    
    if (e.code == "KeyW" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }

    else if (e.code == "KeyS" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == "KeyA" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code == "KeyD" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}

function resetGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    placeFood();
}

function displayScore() {
    context.font = "18pt Calibri";
    context.fillStyle = "white";
    context.textAlign = "left";
    context.fillText(score, 10, 20);
}
