import Ship from './ship';

test('Creates a ship', () => {
  const myShip = new Ship(5);
  expect(myShip.length).toBe(5);
  expect(myShip.isSunk).toBe(false);
});

test('Ship length is constant', () => {
  const myShip = new Ship(2);
  expect(myShip.length).toBe(2);
  myShip.hit();
  myShip.hit();
  expect(myShip.length).toBe(2);
});

test('Ship doesnt sink after < length hits', () => {
  const myShip = new Ship(5);
  expect(myShip.isSunk).toBe(false);
  myShip.hit();
  expect(myShip.isSunk).toBe(false);
  myShip.hit();
  expect(myShip.isSunk).toBe(false);
});

test('Ship sinks after == length hits', () => {
  const myShip = new Ship(5);
  expect(myShip.isSunk).toBe(false);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk).toBe(true);
});

test('Ship remains sunked after >= length hits', () => {
  const myShip = new Ship(5);
  expect(myShip.isSunk).toBe(false);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk).toBe(true);
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk).toBe(true);
});
