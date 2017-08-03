/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(4);
const Tile = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Tile {
  constructor() {
    this.letter = this.chooseLetter();
  }

  chooseLetter() {
    const letterFrequencies = [[null,'E','T','A','O','I','N','S','R','H','D',
    'L','U','C','M','F','Y','W','G','P','B','V','K','X','Q','J','Z'],
  [0,12.02,21.12,29.24,36.92,44.23,51.18,57.46,63.48,69.40,73.72,77.70,80.58,
    83.29,5.90,88.20,90.31,92.40,94.43,96.25,97.74,98.85,99.54,99.71,99.82,
    99.92,100]];

    let randomNum = (Math.random() * 100).toFixed(2);
    for (let i = 1; i < letterFrequencies[1].length; i++) {
      if (randomNum <= letterFrequencies[1][i] && randomNum > letterFrequencies[1][i-1]) {
        return letterFrequencies[0][i];
      }
    }
  }

}

module.exports = Tile;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(3);
const Game = __webpack_require__(0);

$(function () {
  const rootEl = ('.word-game');
  // const game = new Game();
  new View(rootEl);
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

class View {

  constructor($el) {
    this.$el = $el;
    this.string = "";
    this.wordForm = $(".word-form");
    let dictionary;
    $.get("https://s3-us-west-1.amazonaws.com/virginia-wordgame/AllWords.txt", (txt) => {
      dictionary = txt.split('\n');
    }).then((dict) => {
      this.game = new Game(dictionary);
      this.setupBoard();
    });

    $(".string").focus();


    this.interval = window.setInterval(
      this.step.bind(this), View.STEP_MILLIS
    );

    // $(".string").change((e) => this.handleCharacter(e));
    $( "#word-form" ).submit((e) => this.handleSubmit(e));

    $(window).on("keydown", this.handleEnter.bind(this));
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleCharacter = this.handleCharacter.bind(this);

  }

  // submit the form if Enter is pressed
  handleEnter(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $( "#word-form" ).submit();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.string = $( "input:first" ).val().toUpperCase();
    if (this.game.board.validWord(this.string)) {
      this.game.handleWord(this.string);
      this.render();
      this.string = "";
      let form = document.getElementById("word-form");
      form.reset();
      let $score = document.getElementById("score");
      $($score).attr('data-score', this.game.score);
    } else {
      this.game.badWord.play();
    }
  }

  handleCharacter(e) {
    e.preventDefault();
    this.string = e.target.value;
    // check if the new character is in the list of letters on the screen.
    // If it is, turn that tile green. If it's not, give an alert/indicator
    let lastChar = this.string.charAt(this.string.length-1);
    this.board.handleLetter(lastChar);
  }

  setupBoard() {

    const $ul = $("<ul>");
    // $ul.addClass("all-tiles");
    $ul.attr('id','all-tiles');

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 10; colIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);
        if (this.game.board.grid[rowIdx][colIdx]) {
          $li.attr('data-letter', this.game.board.grid[rowIdx][colIdx].letter);
          $li.addClass("tile");
        }

        $ul.append($li);
      }
    }

    $(this.$el).append($ul);
  }

  render() {
    let $ul2 = document.getElementById("all-tiles");
    $ul2.remove();

    const $ul = $("<ul>");
    $ul.attr('id','all-tiles');
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 10; colIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);
        if (this.game.board.grid[rowIdx][colIdx]) {
          $li.attr('data-letter', this.game.board.grid[rowIdx][colIdx].letter);
          $li.addClass("tile");
        }

        $ul.append($li);
      }
    }
    $(this.$el).append($ul);

  }

  step() {
    this.game.board.incrementTiles();
    this.render();
    if (this.game.lose()) {
      this.displayLosing();
    }
  }

  displayLosing() {
    clearInterval(this.interval);

    let $form = document.getElementById("word-form");
    $form.remove();

    const $ul = $("<ul>");
    $ul.attr('id','game-over');
    $ul.text("GAME OVER");

    const $replay = $("<div><button id='replay' onclick='location.reload()'>PLAY AGAIN!</button></div>");
    $ul.append($replay);

    $(this.$el).append($ul);
  }

}

View.STEP_MILLIS = 1000;

module.exports = View;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(1);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map