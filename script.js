var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    document.getElementById("start-btn").addEventListener("click", startGame);
    document.getElementById("reset-btn").addEventListener("click", resetGame);
}

function startGame() {
    setGame();
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("reset-btn").classList.remove("hidden");
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    // Clear the board
    document.getElementById("board").innerHTML = "";
    document.getElementById("message").classList.add("hidden");
    gameOver = false;
    currPlayer = playerO;

    // Create the tiles
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') {
        return; // already taken
    }

    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    // Check for a winner after each move
    checkWinner();

    // Switch players
    currPlayer = (currPlayer === playerO) ? playerX : playerO;
}

function checkWinner() {
    // Check horizontally
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            gameOver = true;
            showWinner(r, 0, r, 1, r, 2);
            return;
        }
    }

    // Check vertically
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            gameOver = true;
            showWinner(0, c, 1, c, 2, c);
            return;
        }
    }

    // Check diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        gameOver = true;
        showWinner(0, 0, 1, 1, 2, 2);
        return;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        gameOver = true;
        showWinner(0, 2, 1, 1, 2, 0);
        return;
    }

    // Check for draw (optional)
    if (board.flat().every(cell => cell !== ' ')) {
        document.getElementById("message").innerText = "It's a draw!";
        document.getElementById("message").classList.remove("hidden");
        gameOver = true;
    }
}

function showWinner(r1, c1, r2, c2, r3, c3) {
    document.getElementById(r1 + "-" + c1).classList.add("winner");
    document.getElementById(r2 + "-" + c2).classList.add("winner");
    document.getElementById(r3 + "-" + c3).classList.add("winner");

    document.getElementById("message").innerText = "You win!";
    document.getElementById("message").classList.remove("hidden");
    
    // Call confetti when a player wins
    partyBomber();
}

function resetGame() {
    setGame();
    document.getElementById("message").classList.add("hidden");
    gameOver = false;
}

function partyBomber() {
    const count = 200; // Number of confetti pieces
    const defaults = {
        origin: { y: 0.6 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, { particleCount: Math.floor(count * particleRatio) }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 30 });
    fire(0.1, { spread: 180, decay: 0.9, scalar: 1 });
}
