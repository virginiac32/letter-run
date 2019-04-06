const Tile = require("./tile.js");

class Board {
  constructor(x,y) {
    this.width = x;
    this.height = y;
    this.grid = [];
    for (let i = 0; i < this.height; i++) {
      this.grid.push(new Array(x).fill(null));
    }
    this.initializeTiles();

  }

  initializeTiles() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = (this.grid[0].length/2)+2; j < this.grid[0].length; j++) {
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
        if (this.grid[i][j].letter === letter ) { // NOTE: AND class != selected
          // change the tile's class to selected, then break
        }
      }
    }
    // give an error
  }

  // returns true if all the letters for the word are on the screen
  validWord(word) {
    let wordLetters= {};
    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      if (!wordLetters[letter]) {
        wordLetters[letter] = 1;
      } else {
        wordLetters[letter] += 1;
      }
    }

    let counter = word.length;
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j]) {
          let letter = this.grid[i][j].letter;
          if (wordLetters[letter] && wordLetters[letter] !== 0) {
            wordLetters[letter] -= 1;
            counter -= 1;
            if (counter === 0) return true;
          }
        }
      }
    }
    return false;
  }

  // clear the letters of the word from the list of letters on the screen
  clearWord(word) {
    let tempWord = word;
    tempWord = tempWord.toUpperCase().split('');
    tempWord.forEach((el) => {
      let removed = false;
      for (let i = 0; i < this.grid[0].length; i++) {
        for (let j = 0; j < this.grid.length; j++) {
          if (!removed && this.grid[j][i]) {
            if (this.grid[j][i].letter === el) {
              this.grid[j][i] = null;
              removed = true;
            }
          }
        }
      }
    });
  }

}

module.exports = Board;
