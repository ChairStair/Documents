// Create the tetrominoes
const I = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
const O = [[0, 0, 0, 0], [0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0]];
const T = [[0, 0, 0, 0], [0, 3, 0, 0], [0, 3, 3, 0], [0, 3, 0, 0]];
const S = [[0, 0, 0, 0], [0, 0, 4, 4], [0, 4, 4, 0], [0, 0, 0, 0]];
const Z = [[0, 0, 0, 0], [5, 5, 0, 0], [0, 5, 5, 0], [0, 0, 0, 0]];
const J = [[0, 0, 0, 0], [0, 6, 0, 0], [0, 6, 6, 0], [0, 6, 0, 0]];
const L = [[0, 0, 0, 0], [0, 0, 7, 0], [0, 7, 7, 0], [0, 0, 7, 0]];

// Create a 2D array that represents the game board
const ROWS = 20;
const COLS = 10;
const board = new Array(ROWS);
for (let i = 0; i < ROWS; i++) {
  board[i] = new Array(COLS).fill(0);
}

// Define the shapes and colors for the tetrominoes
const shapes = [I, O, T, S, Z, J, L];
const colors = ["#00FFFF", "#FFFF00", "#FF00FF", "#00FF00", "#FF0000", "#0000FF", "#FFA500"];

// Define the Tetromino class
class Tetromino {
  constructor() {
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    this.color = colors[shapes.indexOf(this.shape)];
    this.row = 0;
    this.col = Math.floor(COLS / 2) - 2;
  }

  // Move the tetromino down by one row
  moveDown() {
    this.row++;
  }

  // Move the tetromino left by one column
  moveLeft() {
    this.col--;
  }

  // Move the tetromino right by one column
  moveRight() {
    this.col++;
  }

  // Rotate the tetromino 90 degrees clockwise
  rotate() {
    const N = this.shape.length;
    const rotated = new Array(N);
    for (let i = 0; i < N; i++) {
      rotated[i] = new Array(N).fill(0);
    }
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        rotated[j][N - 1 - i] = this.shape[i][j];
      }
    }
    this.shape = rotated;
  }

  // Draw the tetromino on the board
  draw() {
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape.length; j++) {
        if (this.shape[i][j] != 0) {
          board[this.row + i][this.col + j] = this.color;
        }
      }
    }
  }

  // Check if the tetromino is out of bounds or overlapping with another tetromino
  isInvalid() {
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape.length; j++) {
        if (this.shape[i][j] != 0) {
          const row = this.row + i;
          const col = this.col + j;
          if (row < 0 || row >= ROWS || col < 0 || col >= COLS || board[row][col] != 0) {
            return true;
          }
        }
      }
    }
    return false;
  }
}

// Create the Tetris game object
class Tetris {
  constructor() {
    this.paused = false;
    this.score = 0;
    this.level = 1;
    this.speed = 1000 - 100 * (this.level - 1);
    this.tetromino = null;
    this.intervalId = null;
    this.nextTetromino = new Tetromino();
    this.drawBoard();
    this.drawNextTetromino();
    this.newTetromino();
  }

  // Draw the game board on the screen
  drawBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const square = document.createElement("div");
        square.className = "square";
        square.style.backgroundColor = board[i][j];
        boardElement.appendChild(square);
      }
      boardElement.appendChild(document.createElement("br"));
    }
  }

  // Draw the next tetromino on the screen
  drawNextTetromino() {
    const nextTetrominoElement = document.getElementById("next-tetromino");
    nextTetrominoElement.innerHTML = "";
    for (let i = 0; i < this.nextTetromino.shape.length; i++) {
      for (let j = 0; j < this.nextTetromino.shape.length; j++) {
        const square = document.createElement("div");
        square.className = "square";
        square.style.backgroundColor = this.nextTetromino.color;
        if (this.nextTetromino.shape[i][j] != 0) {
          nextTetrominoElement.appendChild(square);
        } else {
          nextTetrominoElement.appendChild(document.createElement("span"));
        }
      }
      nextTetrominoElement.appendChild(document.createElement("br"));
    }
  }

  // Draw the score and level on the screen
  drawScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerHTML = Score: ${this.score};
    const levelElement = document.getElementById("level");
    levelElement.innerHTML = Level: ${this.level};
  }

  // Create a new tetromino
  newTetromino() {
    this.tetromino = this.nextTetromino;
    this.nextTetromino = new Tet
