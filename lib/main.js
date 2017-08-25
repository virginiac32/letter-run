const View = require('./game-view.js');
const Game = require('./game.js');

$(function () {
  const rootEl = ('.word-game');
  new View(rootEl);
});
