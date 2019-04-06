const Board = require("./board");
const Tile = require("./tile");

class Game {

  constructor(dictionary) {
    this.board = new Board(10,4);
    this.score = 0;
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
      document.getElementById("word-input").style.outline = '#FF0015 solid thick';
      this.badWord.play();
      setTimeout(() => document.getElementById("word-input").style.outline = 'none', 200);

    }
  }

  incrementScore(word) {
    if (word.length === 3) {
      this.score += 5;
    } else if (word.length === 4) {
      this.score += 10;
    } else if (word.length === 5) {
      this.score += 15;
    } else if (word.length === 6) {
      this.score += 25;
    } else if (word.length === 7) {
      this.score += 35;
    } else if (word.length === 8) {
      this.score += 45;
    } else if (word.length === 9) {
      this.score += 60;
    } else {
      this.score += 70;
    }
  }

  lose() {
    if ((this.board.grid[0][0] !== null) || (this.board.grid[1][0] !== null)
      || (this.board.grid[2][0] !== null)) {
        return true;
      }
    return false;
  }

}

module.exports = Game;
