const Tile = require("./tile.js");

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
  }

  // updates the tile's class to "selected" if the letter exists in the
  // letters shown on the screen and has not yet been selected. Returns
  // an error if the letter can't be found
  handleLetter(letter) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j].letter === letter ) { // NOTE: AND class != selected. How to do this?
          // change the tile's class to selected, then break (needed?)
        }
      }
    }
    // give an error
  }

  // returns true if all the letters for the word are on the screen
  validWord(word) {
    let allLetters = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j]) {
          allLetters.push(this.grid[i][j].letter);
        }
      }
    }
    for (let i = 0; i < word.length; i++) {
      if (allLetters.indexOf(word[i]) === -1) {
        return false;
      } else {
        let index = allLetters.indexOf(word[i]);
        allLetters.splice(index, 1);
      }
    }
    return true;
  }

  // clear the letters of the word from the list of letters on the screen
  //NOTE: Make sure clearing from the left first!
  clearWord(word) {
    let tempWord = word;
    tempWord = tempWord.toUpperCase().split('');
    tempWord.forEach((el) => {
      let removed = false;
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[0].length; j++) {
          if (!removed && this.grid[i][j]) {
            if (this.grid[i][j].letter === el) {
              this.grid[i][j] = null;
              removed = true;
            }
          }
        }
      }
    });
  }

}

module.exports = Board;
