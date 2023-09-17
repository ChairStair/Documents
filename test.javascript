const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 20;

class Piece {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.color = "blue";
  }
}

const shapes = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Empty
  [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // I
  [2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Z
  [0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], // S
  [0, 4, 4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // L
  [5, 5, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // J
  [0, 6, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T
  [7, 7, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // O
];

let pieces = [];

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * scale, y * scale, scale, scale);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * scale, y * scale, scale, scale);
}

function drawPiece(piece) {
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j]) {
        drawSquare(piece.x + j, piece.y + i, piece.color);
      }
    }
  }
}

function createPiece() {
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const piece = new Piece(6, -2, shape);
  pieces.push(piece);
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  for (let i = 0; i < pieces.length; i++) {
    drawPiece(pieces[i]);
  }
}

let lastTime = 0;
let dropInterval = 1000;
let dropTime = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropTime += deltaTime;
  if (dropTime > dropInterval) {
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].y++;
    }
    dropTime = 0;
  }
  draw();
  requestAnimationFrame(update);
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 37) {
    // Left arrow
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].x--;
    }
  } else if (event.keyCode === 39) {
    // Right arrow
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].x++;
    }
  } else if (event.keyCode === 40) {
    // Down arrow
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].y++;
    }
    dropTime = 0;
  }
});

createPiece();
update();
