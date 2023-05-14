import Ship from './ship';

test('Creates a ship', () => {
  const myShip = new Ship(5);
  expect(myShip.length).toBe(5);
  expect(myShip.isSunk).toBe(false);
});
