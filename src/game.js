/* eslint-disable no-await-in-loop */
import Gameboard from './gameboard';
import Player from './player';
import {
  getHumanPlayerInput, createOnePlayerGameBoards, displayGameboards, showWinner,
} from './domMod';

async function startOnePersonGame() {
  // Create human player & computer player
  const playerHuman = new Player('Player One', true);
  const gameboardHuman = playerHuman.myGameBoard;
  const playerPC = new Player('Player Two', false);
  const gameboardPC = playerPC.myGameBoard;
  playerHuman.setOpponent(playerPC);
  createOnePlayerGameBoards(gameboardHuman, gameboardPC);

  // Place ships on each gameboard
  gameboardHuman.placeShip([0, 0], true, 2);
  gameboardPC.placeShip([0, 0], true, 2);
  displayGameboards(gameboardHuman, gameboardPC);

  // Game loop - do things until one of the gameboards is complete
  let gameOver = gameboardHuman.allSunk || gameboardPC.allSunk;
  while (!gameOver) {
    let attackSuccess = false;
    while (!attackSuccess) {
      const [x, y] = await getHumanPlayerInput();
      attackSuccess = playerHuman.attack(x, y);
    }
    displayGameboards(gameboardHuman, gameboardPC);

    gameOver = gameboardHuman.allSunk || gameboardPC.allSunk;
    if (!gameOver) {
      attackSuccess = false;
      while (!attackSuccess) {
        attackSuccess = playerPC.attack();
      }
    }
    gameOver = gameboardHuman.allSunk || gameboardPC.allSunk;
    displayGameboards(gameboardHuman, gameboardPC);
  }

  // Figure out who won and display
  if (gameboardHuman.allSunk) { showWinner(playerPC); } else { showWinner(playerHuman); }
}

export default startOnePersonGame;
