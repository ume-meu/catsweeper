// catsweeper
var levels = {
    easy:       {
        id: 0,
        rows: 9,
        cols: 9,
        cats: 10
    },
    medium:     {
        id: 1,
        rows: 16,
        cols: 16,
        cats: 40        
    },
    hard:       {
        id: 2,
        rows: 30,
        cols: 16,
        cats: 99      
    }, 
    extreme:    {
        id: 3,
        rows: 30,
        cols: 24,
        cats: 180    
    },
    custom:     {
        id: 4,
        minRows: 9,
        minCols: 9,
        minCats: 10,
        maxRows: 30, 
        maxCols: 30,
        maxCats: 160
    }
};
var inLevels =  {
    undo: 3,
    defaultLevel: 'easy',
    currentLevel: null,
    nRows: null,
    nCols: null,
    nCats: null,
    flags: ['covered', 'flag', 'question'],
    
}



const settingBtn = document.getElementById('settingBtn');
const helpBtn = document.getElementById('helpBtn')
const settingCloseBtn = document.querySelector('.game-setting .icon-close');
const helpCloseBtn = document.querySelector('.game-help .icon-close');
const gameSetting = document.getElementById('gameSetting');
const gameHelp = document.getElementById('gameHelp');
const gameContainer = document.querySelector('.game-container');

settingBtn.addEventListener('click', () => {
    gameSetting.classList.add('display');
    gameContainer.classList.add('dimmed');
});

helpBtn.addEventListener('click', () => {
    gameHelp.classList.add('display');
    gameContainer.classList.add('dimmed');
});

settingCloseBtn.addEventListener('click', ()=> {
    gameSetting.classList.remove('display');
    gameContainer.classList.remove('dimmed');
});

helpCloseBtn.addEventListener('click', ()=> {
    gameHelp.classList.remove('display');
    gameContainer.classList.remove('dimmed');
}); 

var musicOn = 1;
document.getElementById("musicOptions").addEventListener("click", () => {
    if (musicOn == 1) {
        document.getElementById("background-music").pause();
        musicOn = 0;
    } else {
        document.getElementById("background-music").play();
        musicOn = 1;
    }
});