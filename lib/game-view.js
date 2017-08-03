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

View.STEP_MILLIS = 4000;

module.exports = View;
