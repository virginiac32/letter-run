const Board = require("./board");
const Tile = require("./tile");

class Game {

  constructor() {
    this.board = new Board();
    this.points = 0;
    this.level = 1;
    this.dict = this.loadDictionary();
  }

  loadDictionary() {
    // let dict = document.getElementById('dictionary');
    let dict;
    $.get( "https://s3-us-west-1.amazonaws.com/virginia-wordgame/AllWords.txt", function( txt ) {
    dict = txt.split( "\n" );
    });
    return dict;
  }

  // check the submitted word against a dictionary. If the word exists,
  // clear its letters from the screen and add points to the player's score.
  handleWord(word) {
    if (this.dict.includes(word) && word.length >= 3 &&
      this.board.validWord(word))
      {
        this.incrementPoints(word);
        this.board.clearWord(word);
        this.string = "";
        // set focus on the input field
      }
  }

  playLevel() {
    // actions
    if (this.beatLevel()) {
      this.level += 1;
    }
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

  // returns true if the user has beaten the level
  beatLevel() {
    switch (this.level) {
      case 1:
        if (this.points === 100) {
          return true;
        } else {
          return false;
        }
      case 2:
        if (this.points === 120) {
          return true;
        } else {
          return false;
        }
      case 3:
        if (this.points === 170) {
          return true;
        } else {
          return false;
        }
      case 4:
        if (this.points === 200) {
          return true;
        } else {
          return false;
        }
    }
  }

}

module.exports = Game;
