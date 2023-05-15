import Gameboard from './gameboard';

class Player {
  name;

  isHuman;

  myGameBoard;

  oppGameBoard;

  myAttacks = {};

  constructor(name, isHuman) {
    this.name = name;
    this.isHuman = isHuman;
    this.myGameBoard = new Gameboard();
  }

  setOpponent(opponent) {
    this.oppGameBoard = opponent.myGameBoard;
    opponent.oppGameBoard = this.myGameBoard;
  }

  // eslint-disable-next-line max-len
  attack(x = Math.ceil(Math.random() * this.oppGameBoard.width), y = Math.ceil(Math.random() * this.oppGameBoard.height)) {
    if ([x, y].toString() in this.myAttacks) {
      return false;
    }
    this.myAttacks[[x, y].toString()] = null;
    this.oppGameBoard.receiveAttack([x, y]);
    return true;
  }
}

export default Player;
