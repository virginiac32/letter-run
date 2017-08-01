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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);
const Tile = __webpack_require__(2);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(2);

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

  // returns true if all the letters for the word exist
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


/***/ }),
/* 2 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map