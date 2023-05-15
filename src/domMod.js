import Gameboard from './gameboard';
import Player from './player';

function humanInput() {
  return new Promise((resolve, reject) => {
    function clickSquare(evt) {
      const allGridSquares = document.querySelectorAll('#board-pc>.grid-square');
      // eslint-disable-next-line no-restricted-syntax
      for (const gridSquare of allGridSquares) {
        gridSquare.removeEventListener('click', clickSquare);
      }
      const locString = evt.target.getAttribute('data-grid-loc');
      const locArray = locString.slice(1, -1).split(',');
      resolve(locArray);
    }
    const allGridSquares = document.querySelectorAll('#board-pc>.grid-square');
    // eslint-disable-next-line no-restricted-syntax
    for (const gridSquare of allGridSquares) {
      gridSquare.addEventListener('click', clickSquare);
    }
  });
}

async function getHumanPlayerInput() {
  const boardPC = document.getElementById('board-pc');
  const [x, y] = await humanInput();
  return [x, y];
}

const createOnePlayerGameBoards = (gameboardHuman, gameboardPC) => {
  const boardHuman = document.getElementById('board-human');
  const boardPC = document.getElementById('board-pc');

  boardHuman.style.gridTemplateColumns = `repeat(${gameboardHuman.width}, 40px)`;
  boardHuman.style.gridTemplateRows = `repeat(${gameboardHuman.height}, 40px)`;
  boardPC.style.gridTemplateColumns = `repeat(${gameboardPC.width}, 40px)`;
  boardPC.style.gridTemplateRows = `repeat(${gameboardPC.height}, 40px)`;

  for (let i = 0; i < gameboardHuman.width; i += 1) {
    for (let j = 0; j < gameboardHuman.height; j += 1) {
      const gridSquare = document.createElement('div');
      gridSquare.classList.add('grid-square');
      gridSquare.setAttribute('data-grid-loc', `[${i},${j}]`);
      gridSquare.style.gridRow = i + 1;
      gridSquare.style.gridCol = j + 1;
      boardHuman.appendChild(gridSquare);
    }
  }

  for (let i = 0; i < gameboardPC.width; i += 1) {
    for (let j = 0; j < gameboardPC.height; j += 1) {
      const gridSquare = document.createElement('div');
      gridSquare.classList.add('grid-square');
      gridSquare.setAttribute('data-grid-loc', `[${i},${j}]`);
      gridSquare.style.gridRow = i + 1;
      gridSquare.style.gridCol = j + 1;
      boardPC.appendChild(gridSquare);
    }
  }
};

const displayGameboards = (gameboardHuman, gameboardPC) => {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const loc in gameboardHuman.shipLocs) {
    const query = `#board-human>.grid-square[data-grid-loc="[${loc}]"]`;
    const shipSquare = document.querySelector(query);
    shipSquare.classList.add('ship');
  }
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const loc in gameboardHuman.attacks) {
    const query = `#board-human>.grid-square[data-grid-loc="[${loc}]"]`;
    const attackSquare = document.querySelector(query);
    if (gameboardHuman.attacks[loc]) { attackSquare.classList.add('hit'); } else { attackSquare.classList.add('miss'); }
  }

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const loc in gameboardPC.shipLocs) {
    const query = `#board-pc>.grid-square[data-grid-loc="[${loc}]"]`;
    const shipSquare = document.querySelector(query);
    shipSquare.classList.add('ship');
  }
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const loc in gameboardPC.attacks) {
    const query = `#board-pc>.grid-square[data-grid-loc="[${loc}]"]`;
    const attackSquare = document.querySelector(query);
    if (gameboardPC.attacks[loc]) { attackSquare.classList.add('hit'); } else { attackSquare.classList.add('miss'); }
  }
};

const showWinner = (player) => {
  const winnerNode = document.createElement('h1');
  winnerNode.textContent = `${player.name} wins!!`;
  document.querySelector('body').appendChild(winnerNode);
};

export {
  getHumanPlayerInput, createOnePlayerGameBoards, displayGameboards, showWinner,
};
