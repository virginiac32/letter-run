const Game = require('./game.js');

class View {

  constructor($el) {
    this.game = new Game();
    this.$el = $el;
    this.string = "";
    this.wordForm = $(".word-form");

    this.setupBoard();

    window.setInterval(
      this.step.bind(this), View.STEP_MILLIS
    );

    $(window).on("keydown", this.handleEnter.bind(this));
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCharacter = this.handleCharacter.bind(this);

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
    this.string = $( "input:first" ).val();

    if (this.game.board.validWord(this.string)) {
      this.game.handleWord();
    }
  }

  handleCharacter(e) {
    console.log("hello");
    e.preventDefault();
    this.string = e.target.value;
    console.log(this.string);
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

  step() {
    // if still time in the level
    this.game.board.incrementTiles();
    this.render();

    // $( "input[type='text']" ).change(function() {
    //   alert( "Handler for .change() called." );
    // });
    $(".string").change((e) => this.handleCharacter(e));
    $( "#word-form" ).submit((e) => this.handleSubmit(e));
  }

}

View.STEP_MILLIS = 2000;

module.exports = View;
