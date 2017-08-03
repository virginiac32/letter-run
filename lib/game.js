const Board = require("./board");
const Tile = require("./tile");

class Game {

  constructor(dictionary) {
    this.board = new Board();
    this.score = 0;
    this.level = 1;
    this.dict = dictionary;

    this.goodWord = document.getElementById("goodWord");
    this.badWord = document.getElementById("badWord");

  }

  // check the submitted word against a dictionary. If the word exists,
  // clear its letters from the screen and add points to the player's score.
  handleWord(word) {
    if (this.dict.includes(word.toLowerCase()) && word.length >= 3 &&
      this.board.validWord(word)) {
        this.incrementScore(word);
        this.board.clearWord(word);
        this.goodWord.play();
    } else {
      this.badWord.play();
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

  lose() {
    // console.log(this.board.grid[0][0],this.board.grid[0][1],this.board.grid[0][2]);
    if ((this.board.grid[0][0] != null) || (this.board.grid[1][0] != null)
      || (this.board.grid[2][0] != null)) {
        return true;
      }
    return false;
  }

}

module.exports = Game;
