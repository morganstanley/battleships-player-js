const Ship = require('../helpers/Ship.js');

class GameLogic {
  constructor(player) {
    if (!player || player < 0 || player > 1) {
      throw new Error('Invalid player');
    }

    this.player = player;
    this.opponent = 1 - player;

    this.init();
  }

  init() {
    console.log('init game!');
  }

  getMove() {
    return {
        "x": Math.floor(Math.random() * 12), 
        "y": Math.floor(Math.random() * 12)
    }
  }

  /** Checks the ships are valid by
   * 1) Ensuring there's no overlap with the "banned" cells (Other ships & islands)
   * 2) Each cell of the ship placement is within the bounds of the grid
   * 
   * This validation is also done on the server side, but 3 failed placements results
   * in losing the game so good to check prior.
   */
  isShipValid(takenCells, shipCells) {
    const allCellsRaw = shipCells.concat(...takenCells);
    // Map to string so we can do unique test in set
    const allCells = allCellsRaw.map(({x, y}) => `${x}_${y}`);
    const allCellsUnique = [...Array.from(new Set(allCells))];

    return allCells.length === allCellsUnique.length && 
      allCellsRaw.every(({x,y}) => (0 <= x && x < 12) && (0 <= y && y < 12) );

  }


  getRandomTopLeft(maxX, maxY) {
    return {x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY)};
  }

  //Gets a random orientation, from UP, RIGHT, DOWN, & LEFT
  getRandomOrientation() {
    var keys = Object.keys(Ship.Orientation);
    return Ship.Orientation[keys[ keys.length * Math.random() << 0]];
  }

  placeShips(islands) {
    const takenCells = islands.islands;
    const shipPlacement = {};

    for (let ship in Ship.ShipType) {
      // work out boundries for top-left within the board
      let orientation = this.getRandomOrientation();
      let topleft = {x:0,y:0};
      let shipCells = Ship.getCells(ship, topleft, orientation);
      const maxX = 12 - Math.max.apply(Math, shipCells.map(cell => cell.x));
      const maxY = 12 - Math.max.apply(Math, shipCells.map(cell => cell.y));

      //Keep trying until we get a valid placement
      while (!this.isShipValid(takenCells, shipCells)) {
        topleft = this.getRandomTopLeft(maxX, maxY);
        shipCells = Ship.getCells(Ship.ShipType[ship], topleft, orientation)
      }

      //Assign the placement, and add the ship cells to the banned list
      const placement = {orientation: orientation, topleft: `${topleft.x},${topleft.y}`};
      shipPlacement[ship] = placement;
      takenCells.push(...shipCells);
    }
    
    return {"SHIPS" : shipPlacement};
  
  }

  onOpponentMove(opponentMove) {
    console.log(`opponent did - ${opponentMove}`);
  }

  onShotResult(opponentMove) {
    console.log(`Shot Result - ${opponentMove}`);
  }

  onWin() {
    console.log("I win");
  }

  onLost(losingShot) {
    console.log("I lose ", losingShot);
  }

}

module.exports = GameLogic;