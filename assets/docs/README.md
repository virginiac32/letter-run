# Word Game - working title
## Background

Word Game is a one-player anagram word game that is inspired by scrabble and other online anagram games.

### Gameplay

Word Game begins with a collection of letter tiles on the screen which are moving left off of the screen, with new letters moving in from the right. The player types out a word (with a minimum of 3 characters) that can be formed from the letters on the screen. The word must be entered before any of its letters leave the screen.

If the word is valid, those letters fall out of the list and the player gains points, with longer words being worth more points. The player needs to reach X number of points per level before time is up in order to proceed to the next level.

## Functionality and MVP

The game will have the following functionality:

* Validation of the entered word (ensure the letters exist in the string and that the word is in the dictionary)

* Used letters fall out and new letters will be added to the list shown when a word is validated

* Levels that progress in difficulty

In addition to the above, the project will also include:

* A gameplay introduction/tutorial
* A production Readme


## Wireframes

Intro modal:
![intro-page](./wireframes/Word-Game-intro.png)

Game wireframe:
![word-drop](./wireframes/Word-Game.png)

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
* Create the Board class and determine how to move the tiles across the screen

#### Day 2: Word
* Create the Word class, be able to render inputted letters
* Figure out how to use a dictionary to validate words

#### Day 3: Game
* Create the Game class and write the logic for the overall game

#### Day 4: Styling/CSS
* Pull together the look and UX of the app

## Bonus Features
In the future, the game can be expanded to also include the following features:
* Multiplayer mode to compete against other people
