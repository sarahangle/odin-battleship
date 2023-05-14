import Gameboard from './gameboard';
import Ship from './ship';

test('Creates a gameboard', () => {
  const myBoard = new Gameboard();
  expect(myBoard.width).toBe(10);
  expect(myBoard.height).toBe(10);
});

test('Places valid ship in x direction', () => {
  const myBoard = new Gameboard();
  expect(myBoard.ships.length).toBe(0);
  expect(myBoard.placeShip([1, 1], true, 3)).toBe(true);
  expect(myBoard.ships.length).toBe(1);
  expect(Object.keys(myBoard.shipLocs).length).toBe(3);
  expect(myBoard.shipLocs[[1, 1].toString()]).toBe(myBoard.ships[0]);
  expect(myBoard.shipLocs[[2, 1].toString()]).toBe(myBoard.ships[0]);
  expect(myBoard.shipLocs[[3, 1].toString()]).toBe(myBoard.ships[0]);
});

test('Places valid ship in y direction', () => {
  const myBoard = new Gameboard();
  expect(myBoard.ships.length).toBe(0);
  expect(myBoard.placeShip([1, 1], false, 3)).toBe(true);
  expect(myBoard.ships.length).toBe(1);
  expect(Object.keys(myBoard.shipLocs).length).toBe(3);
  expect(myBoard.shipLocs[[1, 1].toString()]).toBe(myBoard.ships[0]);
  expect(myBoard.shipLocs[[1, 2].toString()]).toBe(myBoard.ships[0]);
  expect(myBoard.shipLocs[[1, 3].toString()]).toBe(myBoard.ships[0]);
});

test('Places two valid ships', () => {
  const myBoard = new Gameboard();
  expect(myBoard.ships.length).toBe(0);
  expect(myBoard.placeShip([1, 1], false, 3)).toBe(true);
  expect(myBoard.ships.length).toBe(1);
  expect(Object.keys(myBoard.shipLocs).length).toBe(3);
  expect(myBoard.shipLocs[[1, 1].toString()]).toBe(myBoard.ships[0]);
  expect(myBoard.shipLocs[[1, 2].toString()]).toBe(myBoard.ships[0]);
  expect(myBoard.shipLocs[[1, 3].toString()]).toBe(myBoard.ships[0]);

  expect(myBoard.placeShip([4, 4], true, 5)).toBe(true);
  expect(myBoard.ships.length).toBe(2);
  expect(Object.keys(myBoard.shipLocs).length).toBe(8);
});

test('Doesnt place ship starting off board', () => {
  const myBoard = new Gameboard();
  expect(myBoard.ships.length).toBe(0);
  expect(myBoard.placeShip([-1, 1], true, 3)).toBe(false);
  expect(myBoard.ships.length).toBe(0);
  expect(Object.keys(myBoard.shipLocs).length).toBe(0);
});

test('Doesnt place ship running off board', () => {
  const myBoard = new Gameboard();
  expect(myBoard.ships.length).toBe(0);
  expect(myBoard.placeShip([8, 6], true, 3)).toBe(false);
  expect(myBoard.ships.length).toBe(0);
  expect(Object.keys(myBoard.shipLocs).length).toBe(0);
});

test('Doesnt place overlapping ship', () => {
  const myBoard = new Gameboard();
  expect(myBoard.ships.length).toBe(0);
  expect(myBoard.placeShip([1, 1], true, 3)).toBe(true);
  expect(myBoard.ships.length).toBe(1);
  expect(Object.keys(myBoard.shipLocs).length).toBe(3);
  expect(myBoard.placeShip([2, 0], false, 3)).toBe(false);
  expect(myBoard.ships.length).toBe(1);
  expect(Object.keys(myBoard.shipLocs).length).toBe(3);
});

function setUpAvgGameBoard() {
  const myBoard = new Gameboard();
  myBoard.placeShip([1, 1], false, 3);
  myBoard.placeShip([0, 0], true, 5);
  myBoard.placeShip([7, 3], true, 2);
  myBoard.placeShip([2, 8], true, 4);
  return myBoard;
}

test('Logs valid hit', () => {
  const myBoard = setUpAvgGameBoard();
  myBoard.receiveAttack([8, 3]);
  expect(myBoard.attacks[[8, 3].toString()]).toBe(true);
  expect(Object.keys(myBoard.attacks).length).toBe(1);
});

test('Logs valid miss', () => {
  const myBoard = setUpAvgGameBoard();
  myBoard.receiveAttack([9, 1]);
  expect(myBoard.attacks[[9, 1].toString()]).toBe(false);
  expect(Object.keys(myBoard.attacks).length).toBe(1);
});

test('Sends hits to ship', () => {
  const myBoard = setUpAvgGameBoard();
  const ship3 = myBoard.shipLocs[[7, 3].toString()];
  expect(ship3.isSunk).toBe(false);
  myBoard.receiveAttack([7, 3]);
  myBoard.receiveAttack([8, 3]);
  expect(ship3.isSunk).toBe(true);
  expect(Object.keys(myBoard.attacks).length).toBe(2);
});

test('Reports when all ships sunk', () => {
  const myBoard = new Gameboard();
  myBoard.placeShip([1, 1], false, 3);
  myBoard.placeShip([0, 0], true, 2);
  expect(myBoard.allSunk).toBe(false);
  myBoard.receiveAttack([0, 0]);
  myBoard.receiveAttack([1, 0]);
  expect(myBoard.allSunk).toBe(false);
  myBoard.receiveAttack([1, 1]);
  myBoard.receiveAttack([1, 2]);
  expect(myBoard.allSunk).toBe(false);
  myBoard.receiveAttack([1, 3]);
  expect(myBoard.allSunk).toBe(true);
});
