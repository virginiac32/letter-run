const Board = require("./board");
const Tile = require("./tile");

class Game {

  constructor() {
    this.board = new Board();
    this.score = 0;
    this.level = 1;
    this.dict;
    // this.loadDictionary();

    this.handleWord = this.handleWord.bind(this);
  }

  loadDictionary() {
    // let dict = document.getElementById('dictionary');
    // let dict;
    $.get("https://s3-us-west-1.amazonaws.com/virginia-wordgame/AllWords.txt", (txt) => {
    // dict = txt.split( "\n" );
    // alert(txt);
    this.dict = txt.split('\n');
    // alert(dict);
    // console.log(this.dict);
    // return dict;
    });
    // console.log(dict);
    // return dict;
  }

  // check the submitted word against a dictionary. If the word exists,
  // clear its letters from the screen and add points to the player's score.
  // NOTE: MAKE SURE TO DOWNCASE/UPCASE WORDS BEFORE CHECK AGAINST DICTIONARY
  handleWord(word) {
    // if (this.dict.includes(word) && word.length >= 3 &&
    //   this.board.validWord(word))
    if (word.length >= 3 && this.board.validWord(word)) {
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
