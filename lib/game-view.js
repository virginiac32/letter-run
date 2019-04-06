const Game = require('./game.js');

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

    this.interval = window.setInterval(
      this.step.bind(this), this.stepMillis()
    );

    $(".string").focus();
    this.gamePlay = document.getElementById("gamePlay");
    this.gameOver = document.getElementById("gameOver");

    $( "#word-form" ).submit((e) => this.handleSubmit(e));

    $(window).on("keydown", this.handleEnter.bind(this));
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // faster speed of moving tiles with increasing score
  descendingInterval() {
    clearInterval(this.interval);
    this.interval = window.setInterval(
      this.step.bind(this), this.stepMillis()
    );
  }

  stepMillis() {
    if (!this.game) {
      return 7000;
    } else if (this.game.score <= 265) {
      return (-20*this.game.score)+7000;
    } else {
      return 1700;
    }
  }

  // submit the form if Enter is pressed
  handleEnter(e) {
    if (e.keyCode === 13) {
      if (document.getElementById("intro")) {
        this.startGame();
      } else {
        if (document.getElementById("replay") === null) {
          e.preventDefault();
          $( "#word-form" ).submit();
        } else {
          e.preventDefault();
          location.reload();
        }
      }
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
      document.getElementById("word-input").style.outline = '#FF0015 solid thick';
      this.game.badWord.play();
      setTimeout(() => document.getElementById("word-input").style.outline = 'none', 200);
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
    // setting up the tiles grid
    const $ul = $("<ul>");
    $ul.attr('id','all-tiles');

    for (let rowIdx = 0; rowIdx < this.game.board.height; rowIdx++) {
      for (let colIdx = 0; colIdx < this.game.board.width; colIdx++) {
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

    // adding the bar to the left of the tiles
    const $ledge = $("<div>");
    $ledge.attr('id','ledge');
    $(this.$el).append($ledge);

    // introductory box
    const $intro = $("<div><h1>INSTRUCTIONS</h1><p>Type out words using the letters on the screen. Use the letters before they hit the red bar. Words are 3 letters minimum, and longer words earn you more points. The higher your score, the faster the tiles move. Good luck!</p></div>");
    $intro.attr('id','intro');
    const $start = $("<button id='start'>START</button>");
    $start.click(this.startGame);
    $intro.append($start);
    $(this.$el).append($intro);
  }

  startGame() {
    this.gamePlay = document.getElementById("gamePlay");
    this.gamePlay.volume = 0.3;
    this.gamePlay.loop = true;

    let musicPromise = this.gamePlay.play();
    if (musicPromise !== undefined) {
      musicPromise.catch(error => {
        console.log(error);
      });
    }

    let $intro = document.getElementById("intro");
    $intro.remove();

    let $cover = document.getElementById("cover");
    $cover.remove();

    let $input = document.getElementById("word-input");
    $input.focus();
  }

  render() {
    let $ul2 = document.getElementById("all-tiles");
    $ul2.remove();

    const $ul = $("<ul>");
    $ul.attr('id','all-tiles');
    for (let rowIdx = 0; rowIdx < this.game.board.height; rowIdx++) {
      for (let colIdx = 0; colIdx < this.game.board.width; colIdx++) {
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
    this.descendingInterval();

    let $intro = document.getElementById("intro");
    if (!$intro) {
      this.game.board.incrementTiles();
      this.render();
      if (this.game.lose()) {
        this.gamePlay.pause();
        this.displayLosing();
      }
    }
  }

  displayLosing() {
    clearInterval(this.interval);
    this.gameOver.play();

    let $form = document.getElementById("word-form");
    $form.remove();

    const $ul = $("<ul>");
    $ul.attr('id','game-over');
    $ul.text("GAME OVER");

    $(this.$el).append($ul);

    const $replay = $("<ul><button id='replay' onclick='location.reload()'>PLAY AGAIN!</button></ul>");
    $replay.attr('id','replay');

    setTimeout(() => $(this.$el).append($replay) , 2000);
  }

}

module.exports = View;
