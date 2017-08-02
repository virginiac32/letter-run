const Board = require("./board");
const Tile = require("./tile");

class Game {

  constructor(dictionary) {
    this.board = new Board();
    this.score = 0;
    this.level = 1;
    this.dict = dictionary;
    // this.loadDictionary();

  }

  // check the submitted word against a dictionary. If the word exists,
  // clear its letters from the screen and add points to the player's score.
  handleWord(word) {
    if (this.dict.includes(word.toLowerCase()) && word.length >= 3 &&
      this.board.validWord(word)) {
        this.incrementScore(word);
        this.board.clearWord(word);
    }
  }

  playLevel() {
    // actions
    if (this.beatLevel()) {
      this.level += 1;
    }
  }

  incrementScore(word) {
    switch (true) {
      case (word.length === 3):
        this.score += 5;
        break;
      case (word.length === 4):
        this.score += 10;
        break;
      case (word.length === 5):
        this.score += 15;
        break;
      case (word.length === 6):
        this.score += 25;
        break;
      case (word.length === 7):
        this.score += 35;
        break;
      case (word.length === 8):
        this.score += 45;
        break;
      case (word.length === 9):
        this.score += 60;
        break;
      case (word.length >= 10):
        this.score += 70;
        break;
    }
  }

  // returns true if the user has beaten the level
  beatLevel() {
    switch (this.level) {
      case 1:
        if (this.score === 100) {
          return true;
        } else {
          return false;
        }
      case 2:
        if (this.score === 120) {
          return true;
        } else {
          return false;
        }
      case 3:
        if (this.score === 170) {
          return true;
        } else {
          return false;
        }
      case 4:
        if (this.score === 200) {
          return true;
        } else {
          return false;
        }
    }
  }

}

module.exports = Game;
