class Tile {
  constructor() {
    this.letter = this.chooseLetter();
  }

  chooseLetter() {
    const letterFrequencies = [[null,'E','T','A','O','I','N','S','R','H','D',
    'L','U','C','M','F','Y','W','G','P','B','V','K','X','Q','J','Z'],
  [0,12.02,21.12,29.24,36.92,44.23,51.18,57.46,63.48,69.40,73.72,77.70,80.58,
    83.29,5.90,88.20,90.31,92.40,94.43,96.25,97.74,98.85,99.54,99.71,99.82,
    99.92,100]];

    let randomNum = (Math.random() * 100).toFixed(2);
    for (let i = 1; i < letterFrequencies[1].length; i++) {
      if (randomNum <= letterFrequencies[1][i] && randomNum > letterFrequencies[1][i-1]) {
        return letterFrequencies[0][i];
      }
    }
  }
}

module.exports = Tile;
