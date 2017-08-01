const Tile = require("./tile");

class Board {
  constructor() {
    this.grid = [[null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null]];
    this.initializeTiles();

  }

  initializeTiles() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = (this.grid[0].length/2)-1; j < this.grid[0].length; j++) {
        let tile = new Tile();
        this.grid[i][j] = tile;
      }
    }
  }

  incrementTiles() {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].shift();
      this.grid[i].push(new Tile());
    }
    // need to 
  }



}

module.exports = Board;
