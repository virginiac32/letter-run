const Tile = require("./tile");

class Board {
  constructor() {
    this.width = 10;
    this.height = 3;
    this.populateTiles();

    this.grid = [[null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null]];
  }

  populateTiles() {

  }

}

module.exports = Board;
