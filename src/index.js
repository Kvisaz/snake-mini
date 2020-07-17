(function () {
  let canvas = document.getElementById("game");
  const { width, height } = canvas;
  let ctx = canvas.getContext("2d");
  document.addEventListener("keydown", onKeyDown);
  setInterval(gameLoop, 1000 / 15);

  let playerCol = 10;
  let playerRow = 10;

  const boardTileSize = 20;
  const maxTile = boardTileSize - 1;

  const tileSize = 20;
  const tilePx = (tile) => tile * tileSize;

  const visibleSize = tileSize - 2;

  let appleCol = (appleRow = 15);
  let velocityX = 0;
  let velocityY = 0; // скорость
  let snakeTiles = [];
  let snakeLength = 5;

  function onKeyDown(e) {
    switch (e.code) {
      case "ArrowLeft":
        velocityX = -1;
        velocityY = 0;
        break;
      case "ArrowUp":
        velocityX = 0;
        velocityY = -1;
        break;
      case "ArrowRight":
        velocityX = 1;
        velocityY = 0;
        break;
      case "ArrowDown":
        velocityX = 0;
        velocityY = 1;
        break;
    }
  }

  function gameLoop() {
    update();
    render();
  }

  /**************
   *  logic
   *************/

  function update() {
    updateSnakeXY();
    updateKeys();
    updateCollisions();
    updateSnake();
  }

  function updateSnakeXY() {
    playerCol += velocityX;
    playerRow += velocityY;
  }

  function updateKeys() {
    if (playerCol < 0) {
      playerCol = maxTile;
    }
    if (playerCol > maxTile) {
      playerCol = 0;
    }
    if (playerRow < 0) {
      playerRow = maxTile;
    }
    if (playerRow > maxTile) {
      playerRow = 0;
    }
  }

  function collideTile(col1, row1, col2, row2) {
    return col1 === col2 && row1 === row2;
  }

  function updateCollisions() {
    snakeTiles.forEach((tile) => {
      if (collideTile(tile.col, tile.row, playerCol, playerRow)) {
        snakeLength = 5;
      }

      if (collideTile(appleCol, appleRow, playerCol, playerRow)) {
        snakeLength++;
        appleCol = Math.round(Math.random() * maxTile);
        appleRow = Math.round(Math.random() * maxTile);
      }
    });
  }

  function updateSnake() {
    snakeTiles.push({
      col: playerCol,
      row: playerRow,
    });
    while (snakeTiles.length > snakeLength) {
      snakeTiles.shift(); // нужно сбрасывать первые тайлы в массиве
    }
  }

  /**************
   *  render
   *************/

  function render() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "red";
    renderTile(appleCol, appleRow);

    ctx.fillStyle = "lime";
    snakeTiles.forEach((tile) => {
      renderTile(tile.col, tile.row);
    });
  }

  function renderTile(col, row) {
    ctx.fillRect(tilePx(col), tilePx(row), visibleSize, visibleSize);
  }
})();
