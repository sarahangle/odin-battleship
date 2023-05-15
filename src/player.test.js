import Player from './player';
import Gameboard from './gameboard';
import Ship from './ship';

test('Constructs with correct gameboards', () => {
  const player1 = new Player('One', true);
  const player2 = new Player('Two', false);
  player1.setOpponent(player2);

  expect(player1.oppGameBoard).toBe(player2.myGameBoard);
  expect(player2.oppGameBoard).toBe(player1.myGameBoard);
});

function setUpTwoPlayers() {
  const player1 = new Player('One', true);
  const player2 = new Player('Two', false);
  player1.setOpponent(player2);
  player1.oppGameBoard.placeShip([0, 0], true, 2);
  return [player1, player2];
}

test('Constructs with correct gameboards', () => {
  const [player1, player2] = setUpTwoPlayers();
  expect(player1.oppGameBoard.allSunk).toBe(false);

  player1.attack(0, 0);
  expect(player2.myGameBoard.attacks[[0, 0].toString()]).toBe(true);
  player1.attack(1, 0);
  player1.attack(2, 0);
  expect(player1.oppGameBoard.allSunk).toBe(true);
});
