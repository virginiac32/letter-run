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

  constructor() {
    this.board = new Board();
    this.points = 0;
    this.level = 1;
    // this.dict = this.loadDictionary();
  }

  loadDictionary() {
    let dict = [];
    $.getJSON( "../word-game/dict/AllWords.txt", function( txt ) {
    // Get an array of all the words
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Tile {
  constructor() {
    this.letter = this.chooseLetter();
  }

  chooseLetter() {
    const letterFrequencies = [['E','T','A','O','I','N','S','R','H','D',
    'L','U','C','M','F','Y','W','G','P','B','V','K','X','Q','J','Z'],
  [12.02,21.12,29.24,36.92,44.23,51.18,57.46,63.48,69.4,73.72,77.7,80.58,
    83.29,5.9,88.2,90.31,92.4,94.43,96.25,97.74,98.85,99.54,99.71,99.82,
    99.92,100]];

    let randomNum = (Math.random() * 100).toFixed(2);
    for (let i = 0; i < letterFrequencies[1].length; i++) {
      if (randomNum >= letterFrequencies[1][i]) {
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
    this.game = new Game();
    this.$el = $el;
    this.string = "";

    this.setupBoard();

    // this.intervalId = window.setInterval(
    //   this.step.bind(this),
    //   View.STEP_MILLIS
    // );

    $(window).on("keydown", this.handleEnter.bind(this));
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCharacter = this.handleCharacter.bind(this);

  }

  handleEnter(e) {
    if (e.keyCode == 13) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.board.validWord(this.string)) {
      this.game.handleWord();
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
    $ul.addClass("all-tiles");

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 10; colIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);
        if (this.game.board.grid[rowIdx][colIdx]) {
          $li.data("letter", this.game.board.grid[rowIdx][colIdx].letter);
          $li.addClass("tile");
        }

        $ul.append($li);
      }
    }
    console.log($ul);

    $(this.$el).append($ul);
    // this.$el.append($ul);
  }

  // render() {
  //
  //   this.$el.html(this.game.board.render());
  //
  // }

  step() {
    // if still time in the level
    this.game.board.incrementTiles();
    this.render();
  }

}

View.STEP_MILLIS = 100;

module.exports = View;

// return (
//   <form className="word-form" onSubmit={this.handleSubmit}>
//     <ul>
//       <li>
//       <input className="string" value={this.string}
//         onChange={this.handleCharacter()} />
//       </li>
//       <li>
//       <input type="submit">Submit</input>
//       </li>
//     </ul>
//   </form>
// );


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
    let unavailableLetters = [];
    for (let i = 0; i < this.grid.length; i++) {
      // if (this.grid[i].letter has class of "selected") {
      // use jquery hasClass() method?
      //  unavailableLetters.push(this.grid[i].letter);
      // }
      this.grid[i].shift();
      this.grid[i].push(new Tile());
    }
    if (unavailableLetters.length > 0) {
      // give an indication to the player
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map