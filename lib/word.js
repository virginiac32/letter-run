const Board = require("./board");
const Tile = require ("./tile");

class Word {

  constructor() {
    this.string = "";
  }

  updateString() {
    this.string = e.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
        <form className="word-form" onSubmit={this.handleSubmit}>
          <ul>
            <li>
            <input className="string" value={this.string}
              onChange={this.updateString()} />
            </li>
            <li>
              {this.renderSubmit()}
            </li>
          </ul>
        </form>
    );
  }
}
