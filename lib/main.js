const GameView = require('./game-view');

$(function () {
  const rootEl = ('.word-game');
  new GameView(rootEl);
});
