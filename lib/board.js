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
    let unavailableLetters = [];
    for (let i = 0; i < this.grid.length; i++) {
      // if (this.grid[i].letter has class of "selected") {
      // use jquery hasClass() method?
      //  unavailableLetters.push(this.grid[i].letter);
      // }
      this.grid[i].shift();
      this.grid[i].push(new Tile());
    }
    // if (unavailableLetters.length > 0) {
    //   // give an indication to the player
    // }
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
        allLetters.push(this.grid[i][j].letter);
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
  clearWord(word) {
    let tempWord = word;
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j].letter === tempWord[0]) {
          this.grid[i][j] = null;
          tempWord = tempWord.slice(1);
        }
      }
    }
  }

}


module.exports = Board;
