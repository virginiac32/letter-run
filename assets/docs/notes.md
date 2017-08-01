# Implementation Notes

## Architecture and Technologies

The game will be implemented using the following technologies:

* Vanilla Javascript and jquery for the overall structure and game logic
* Webpack to bundle the various scripts

The game will have the following scripts:

* Tile - each letter tile
* Board - the board of tiles
* Word - the word/letters entered by the player
* Game - the overall game



## Implementation Timeline

#### Day 1: Setup and configure app, Tiles, and Board
* Create the all the necessary files.
* Create the Tile class, including random generation of letters based on frequency in words
  * How should the %s be saved? As a hash/array?
* Create the Board class and determine how to move the tiles across the screen
  * The Board can be rendered as an HTML table, with each tile as a cell. Because the tiles move across the screen, the board should re-render with the new tile positions each X milliseconds.

#### Day 2: Word
* Create the Word class, be able to render inputted letters
  * This will be a form that shows the inputted letters each time the form is updated.
* Figure out how to use a dictionary to validate words

#### Day 3: Game & remaining functionality
* Create the Game class and write the logic for the overall game, including levels
* Create the Timer and Scoreboard

#### Day 4: Styling/CSS
* Pull together the look and UX of the app

## Questions
* How should letter frequencies be saved/accessed?
