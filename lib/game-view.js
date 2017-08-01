const Game = require('./game');

class View {

  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.string = "";

    this.setupBoard();

    $(window).on("keydown", this.handleEnter.bind(this));
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWord = this.handleWord.bind(this);

  }

  handleEnter(e) {
    if (e.keyCode == 13) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.board.validWord(this.string)) {
      this.handleWord(); // make this!
    }
  }

  handleWord() {
    // check the submitted word against a dictionary. If the word exists,
    // clear its letters from the screen and add points to the player's score.
    this.string = "";
    // set focus on the input field
  }

  handleCharacter() {
    this.string = e.target.value;
    // check if the new character is in the list of letters on the screen.
    // If it is, turn that tile green. If it's not, give an alert/indicator
  }

  setupBoard() {
    const $ul = $("<ul>");
    $ul.addClass("all-tiles");

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 10; colIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);

        $ul.append($li);
      }
    }

    this.$el.append($ul);
  }

  render() {


    return (
      <form className="word-form" onSubmit={this.handleSubmit}>
        <ul>
          <li>
          <input className="string" value={this.string}
            onChange={this.handleCharacter()} />
          </li>
          <li>
          <input type="submit">Submit</input>
          </li>
        </ul>
      </form>
    );
  }




}

module.exports = View;
