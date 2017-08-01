const Board = require("./board");
const Tile = require("./tile");

class Game {

  constructor() {
    this.board = new Board();
    this.points = 0;
    this.level = 1;
  }

  handleWord(word) {
    // check the submitted word against a dictionary. If the word exists,
    // clear its letters from the screen and add points to the player's score.
    // if (valid word and exists in the letters)
      this.incrementPoints(word);
      this.board.clearWord(word);
      this.string = "";
    // set focus on the input field
  }

  incrementPoints(word) {
    switch (true) {
      case (word.length === 3):
        this.points += 5;
        break;
      case (word.length === 4):
        this.points += 10;
        break;
      case (word.length === 5):
        this.points += 15;
        break;
      case (word.length === 6):
        this.points += 25;
        break;
      case (word.length === 7):
        this.points += 35;
        break;
      case (word.length === 8):
        this.points += 45;
        break;
      case (word.length === 9):
        this.points += 60;
        break;
      case (word.length >= 10):
        this.points += 70;
        break;
    }
  }

}

module.exports = Game;
