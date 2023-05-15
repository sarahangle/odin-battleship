import Ship from './ship';

class Gameboard {
  width = 10;

  height = 10;

  allSunk = false;

  ships = [];

  shipLocs = {};

  attacks = {};

  // Returns true if ship is placed in valid location, false if ship could not be placed
  placeShip([startX, startY], isXDir, length) {
    for (let i = 0; i < length; i += 1) {
      if (isXDir && !this.shipSquareValid([startX + i, startY])) { return false; }
      if (!isXDir && !this.shipSquareValid([startX, startY + i])) { return false; }
    }
    const newShip = new Ship(length);
    this.ships.push(newShip);
    for (let i = 0; i < length; i += 1) {
      if (isXDir) {
        this.shipLocs[[startX + i, startY].toString()] = newShip;
      } else {
        this.shipLocs[[startX, startY + i].toString()] = newShip;
      }
    }
    return true;
  }

  // Takes an x, y coordinate and plays on the game board.
  // Returns null if the hit is not valid, true if hit, and false if miss.
  receiveAttack([x, y]) {
    if ([x, y].toString() in this.attacks) { return null; }
    if (x < 0 || y < 0 || x > this.width || y > this.height) { return null; }

    if ([x, y].toString() in this.shipLocs) {
      const hitShip = this.shipLocs[[x, y].toString()];
      hitShip.hit();
      if (hitShip.isSunk) { this.checkAllSunk(); }
      this.attacks[[x, y].toString()] = true;
    } else {
      this.attacks[[x, y].toString()] = false;
    }
    return true;
  }

  shipSquareValid([x, y]) {
    if (x < 0 || x >= this.width) { return false; }
    if (y < 0 || y >= this.height) { return false; }
    if (this.shipLocs[[x, y].toString()]) { return false; }
    return true;
  }

  checkAllSunk() {
    // eslint-disable-next-line no-restricted-syntax
    for (const ship of this.ships) {
      if (!ship.isSunk) {
        this.allSunk = false;
        return;
      }
    }
    this.allSunk = true;
  }
}

export default Gameboard;
