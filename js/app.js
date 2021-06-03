var app = {
  inputCount:0,
  gameOver: false,
  player: {
    x: 0,
    y: 0,
    direction: 'right',
    rotationValue: 0,
    progressionX: 2,
    progressionY: 10,
  },

  row: 4,
  column: 6,

  targetCell: {
    x: 5,
    y: 3
  },

  startingCell: {
    x: 0,
    y: 0,
  },

  init: function () {
    console.log('DOM fully loaded and parsed.');
    app.boardElement = document.getElementById('board');
    app.drawBoard();
  },

  turnRight: function () {
    if (app.gameOver) {
      return;
    } else {
      app.inputCount++;
      switch (app.player.direction) {
        case 'up':
          app.player.direction = 'right';
          break;
        case 'right':
          app.player.direction = 'down';
          break;
        case 'down':
          app.player.direction = 'left';
          break;
          default: 
          app.player.direction = 'up';
      }
      app.playerElement.classList.add('player--' + app.player.direction);
    }
    app.redrawBoard();
  },

  turnLeft: function () {
    if (app.gameOver) {
      return;
    } else {
      app.inputCount++;
      app.playerElement.classList.remove('player--' + app.player.direction);

      if (app.player.direction === 'up') {
        app.player.direction = 'left'
      }
      else if (app.player.direction === 'left') {
        app.player.direction = 'down'
      }
      else if (app.player.direction === 'down') {
        app.player.direction = 'right'
      }
      else {
        app.player.direction = 'up'
      }
      app.playerElement.classList.add('player--' + app.player.direction);
    }
    app.redrawBoard();
  },

  moveForward: function () {
    if (app.gameOver) {
      return;
    } else {
      app.inputCount++;
      // to go right 
      if (app.player.x < app.column - 1 && app.player.direction === 'right') {
        app.player.x++;
      }

      // to go left
      else if (app.player.x > 0 && app.player.direction === 'left') {
        app.player.x--;
      }

      // to go up
      else if (app.player.y > 0 && app.player.direction === 'up') {
        app.player.y--;
      }

      // to go down
      else if (app.player.y < app.row - 1 && app.player.direction === 'down') {
        app.player.y++;
      }

      else {
        return;
      }
    }
    app.redrawBoard();
  },

  isGameOver: function () {
    if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
      app.gameOver = true;
      console.log('Congratulations, you reached the end !');
      setTimeout(function(){
        alert(`You win ! It took you ${app.inputCount} moves.`);
     }, 100);
    } else {
      app.gameOver = false;
    }
  },

  drawBoard: function () {
    for (rowIndex = 0; rowIndex < app.row; rowIndex++) {
      let rowElement = document.createElement('div');
      rowElement.className = 'row';
      app.boardElement.appendChild(rowElement);

      for (columnIndex = 0; columnIndex < app.column; columnIndex++) {
        let cellElement = document.createElement('div');
        cellElement.className = 'cell';
        rowElement.appendChild(cellElement);

        // player initial placement
        if (app.player.x === columnIndex && app.player.y === rowIndex) {
          app.playerElement = document.createElement('div');
          app.playerElement.className = ('player player--' + app.player.direction);
          cellElement.appendChild(app.playerElement);
          app.playerElement.classList.add('player');
        }

        // Starting cell
        if (app.startingCell.x === columnIndex && app.startingCell.y === rowIndex) {
          cellElement.classList.add('startingCell');
        }

        // Objective placement
        if (rowIndex === app.targetCell.y && columnIndex === app.targetCell.x) {
          cellElement.classList.add('targetCell');
        }
      }
    }
  },

  // arrow key event for movements
  movement: document.addEventListener('keyup', function (event) {

    if (event.defaultPrevented) {
      console.log("default prevented.");
      return;
    }

    switch (event.key) {
      case "ArrowUp":
        app.moveForward();
        break;

      case "ArrowRight":
        app.turnRight();
        break;

      case "ArrowLeft":
        app.turnLeft();
        break;

      default:
        return;
    }

    event.preventDefault()
  }, true),

  clearBoard: function () {
    app.boardElement.innerHTML = '';
  },

  redrawBoard: function () {
    app.clearBoard();
    app.drawBoard();
    app.isGameOver();
  },
};
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('document fully loaded and parsed.');
  app.init();
});
