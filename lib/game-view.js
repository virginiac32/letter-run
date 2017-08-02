const Game = require('./game.js');

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
          // $li.data("letter", this.game.board.grid[rowIdx][colIdx].letter);
          $li.attr('data-letter', this.game.board.grid[rowIdx][colIdx].letter);
          $li.addClass("tile");
        }

        // console.log($li.data().letter);

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
