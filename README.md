<h6 align="center" style="color: rgb(98, 98, 98);">INTERNATIONAL UNIVERSITY - VNUHCM</h6>
<div id="top" align ="center">
    <img src="./src/GameStage/resources/forReadme/banner.gif" alt="Banner">
</div>
<br>
<div align="center">
    <a href="https://github.com/nguyenthiyenchi/catsweeper/graphs/contributors"><img alt="contributors" src="https://img.shields.io/github/contributors/nguyenthiyenchi/catsweeper.svg?color=808080"></a>
    <a href="https://github.com/nguyenthiyenchi/catsweeper/forks"><img alt="forks" src="https://img.shields.io/github/stars/nguyenthiyenchi/catsweeper"></a>
    <a href="https://github.com/nguyenthiyenchi/catsweeper/stargazers"><img alt="stars" src="https://img.shields.io/github/stars/nguyenthiyenchi/catsweeper"></a>
    <a href="https://github.com//nguyenthiyenchi/catsweeper/issues"><img alt="" src="https://img.shields.io/github/issues/nguyenthiyenchi/catsweeper.svg?color=808080"></a>
    <br>
    <img alt="" src="https://img.shields.io/github/created-at/nguyenthiyenchi/catsweeper?labelColor=808080&color=808080">
</div>
<div align="center">    
    <h1>CATSWEEPER</h1>    
    Incorporating technologies like HTML, CSS, JavaScript, and ElectronJS, <strong>Catsweeper</strong> is a classic single-player puzzle Minesweeper game designed to enhance learning in Data Structures & Algorithms.
</div>   
<br>

# Table of Content :clipboard:

1. [Introduction](#introduction)
2. [Team members](#team-members)
3. [System design and Modeling](#system-design-and-modeling)
4. [UI Interface](#ui-interface)
5. [Installation](#installation)
6. [How to play](#how-to-play)
7. [References](#references)

<!-- Introduction -->
# Introduction <a name="introduction"></a> :placard:

### Demo :cinema::
<div align ="center">
    <img style="border-radius: 10px;" src="./src/GameStage/resources/forReadme/demo.gif" alt="Demo">
</div>

### About the Minesweeper game:
- The classic Minesweeper game, originating from the early days of personal computing, has remained a classic and captivating single-player puzzle game.
- The Minesweeper game involves a grid of cells, some of which contain hidden mines. Players must strategically reveal cells without mines and use numerical clues provided by neighboring cells to identify and flag the locations of mines. 
- The game is won when all non-mine cells are successfully revealed, and lost if a mine is accidentally uncovered.

### About our Catsweeper game:
- Catsweeper is a strategy game that puts a new spin on the classic Minesweeper game. 
- In this version, players have to avoid clicking on hidden cats that placed randomly on a grid, just like the original mines. The aim is to reveal all the safe squares without hitting a cat. 
- However, what makes the Catsweeper unique are:    
    - The implementation of Depth-First Search (DFS) algorithm to the cat-revealing mechanism
    - A special undo feature, which lets players undo their mistake if they accidently click on a cat. 
    - Background music in each winning and losing scenarios, which may give the gameplay a more upbeat feel.
- This combination of the well-known Minesweeper game with new features creates an engaging and refreshing gaming experience.

# Team members <a name="team-members"></a> :couplekiss_man_woman:

Our Team Rocket includes two members, we are enrolled in the Information Technology program at International University of Ho Chi Minh City.
|Name - Github|Student ID|Tasks|Contribution|
|:------------:|:-----:|:---------------:|:----:|
|Nguyen Thi Yen Chi<br>[nguyenthiyenchi](https://github.com/nguyenthiyenchi)|ITITIU21005|<p align="left">- Write report<br>- Write mostly function of init()<br>- setClickEvents()<br>- Design UI, Sounds and Effect<br>- Draw Icons<br>- Fix Bugs</p>|30%|
|Ngo Luu Tan Hung<br>[HngNg](https://github.com/HngNg)|ITITIU21129|<p align="left">- Write report<br>- Write function of moveCat(), undo()<br>- Implement DSA Algorithm<br>- Draw UML Diagram<br>- Draw Icons<br>- Fix Bugs</p>|30%|

<!-- System design and Modeling -->
# System design and Modeling <a name="system-design-and-modeling"></a> :gear:

### Working tools, platform:
1. __Text Editors/IDEs__: Visual Studio Code (VSCode)
2. __Browser for Testing__: Microsoft Edge
3. __Framework__: ElectronJS
4. __Library__: JQuery
5. __Programming Language__: JavaScript
6. __Front-End Technologies__: HTML5 and CSS3
7. __Collaboration and Communication__: Github

### Class Diagram:
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/class-diagram.png" alt="Class Diagram">
</div>

### Use Case Scenario:
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/use-case-scenario.png" alt="Use Case Scenario">
</div>

### Use Case Diagram:
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/use-case-diagram.png" alt="Use Case Diagram">
</div>

# UI Interface <a name="ui-interface"></a> :sparkles:
### Main Menu State:
This is where users start the game. There includes the game's name, and a big button to begin playing.
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/menu-title.png" alt="Main menu with title">
</div>
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/menu-btn.png" alt="Main menu with title and button">
</div>

### In-Game State:
Once you press "Play", you enter the actual game.
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/play-clicked.png" alt="After clicking on Play button">
</div>

Here, there are a grid of cells. Some cells have mines, some have numbers. Our job is to figure out where the mines are without clicking on them. There's also a timer to see how fast we can finish.
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/ingame.jpg" alt="Ingame">
</div>

Help, Setting, Highscores
<div align ="center">
    <img style="width:30%;height:30%" src="./src/GameStage/resources/forReadme/help.png" alt="Help">
    <img style="width:30%;height:30%" src="./src/GameStage/resources/forReadme/setting.png" alt="Setting">
    <img style="width:30%;height:30%" src="./src/GameStage/resources/forReadme/highscores.png" alt="Highscores">
</div>

# Installation <a name="installation"></a> :comet:

# How to play  <a name="how-to-play"></a> :video_game:
### Begin the game
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/begin.png" alt="Begin the game">
</div>

-	Click the Choose Mode tab, and it will show you five options of playing modes, which are: Easy, Medium, Hard, Extreme, and Custom.
-	Users can click Setting or Help icons to open these tabs, and make their further choices.

### How to play
- Tap on a square to open it. The number showed on it indicates exactly how many cats there are surrounding that square.
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/ex1cell.png" alt="An example of a ‘1’ cell">
</div>

- When users assume that there is a cat, users can flag that cell by right-click on it. For example, if there is a ‘1’ cell, and there is only one unrevealed cell around it, that cell should has a cat, and the users should flag that cell.
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/right-flag.png" alt="Right click to flag a cell">
</div>

- The game ends when players found a cat. All undiscovered cats will be visible when the game is over. 
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/game-over.png" alt="A red cat cell – the sign of game over">
</div>

- A player has three chances to undo his/her move. After three times, the player will officially lose, and the cat will cry for a while.
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/undo.png" alt="Undo box – the player’s second chance">
</div>

- To win the game, players need to open all safe cells.
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/win.png" alt="An example of a win game">
</div>

- The user’s score is the number of flag that they placed correct. For each mode, there is a high-score that will update when the user break their record.
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/score-board.png" alt="High-scores board">
</div>

- A new game can be start by choosing a level or clicking the new game button.
<div align ="center">
    <img src="./src/GameStage/resources/forReadme/game-mode.png" alt="Game mode options">
</div>

- If the sound of losing/winning game is too noisy, turn off the sound in Setting

# References <a name="references"></a> :books:
- [Learn How to Create a Minesweeper Game with HTML, CSS, and JavaScrip](https://www.codewithfaraz.com/content/134/learn-how-to-create-a-minesweeper-game-with-html-css-and-javascript)
- [Simple JavaScript Minesweeper](https://code-boxx.com/simple-javascript-minesweeper/)
- [Minesweeper](https://codepen.io/joelbyrd/pen/YPKPbw)
- [Minesweeper Pattern Guide](https://www.youtube.com/watch?v=6vcSO7h6Nt0)
