const Board = require("./board");
const Tile = require ("./tile");

class Word {

  constructor() {
    this.string = "";
  }

  handleCharacter() {
    this.string = e.target.value;
    // check if the new character is in the list of letters on the screen.
    // If it is, turn that tile green. If it's not, give an alert/indicator
  }

  handleSubmit(e) {
    e.preventDefault();
    // check the submitted word against a dictionary. If the word exists,
    // clear its letters from the screen and add points to the player's score.
    // Clear the form.
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
