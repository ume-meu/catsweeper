// catsweeper
// var levels = {
//     easy:       {
//         id: 0,
//         rows: 9,
//         cols: 9,
//         cats: 10
//     },
//     medium:     {
//         id: 1,
//         rows: 16,
//         cols: 16,
//         cats: 40        
//     },
//     hard:       {
//         id: 2,
//         rows: 30,
//         cols: 16,
//         cats: 99      
//     }, 
//     extreme:    {
//         id: 3,
//         rows: 30,
//         cols: 24,
//         cats: 180    
//     },
//     custom:     {
//         id: 4,
//         minRows: 9,
//         minCols: 9,
//         minCats: 10,
//         maxRows: 30, 
//         maxCols: 30,
//         maxCats: 160
//     }
// };
// var inLevels =  {
//     undo: 3,
//     defaultLevel: 'easy',
//     currentLevel: null,
//     nRows: null,
//     nCols: null,
//     nCats: null,
//     flags: ['covered', 'flag', 'question'] 
// }
var level = {
    numRows: 0,
    numCols: 0
}

function chooseMode() {
    var mode = document.getElementById("mode").getElementsByClassName("options")[0];
    mode.style.display = (mode.style.display === "block") ? "none" : "block";
}
function choose(option) {
    var btn = document.getElementById("mode").getElementsByTagName("button")[0];
    btn.textContent = option.textContent;
    //change game size depending on mode
    if (option.value != "custom")   {
        const selectedMode = option.value.split('x');
        level.numCols = selectedMode[0];
        level.numRows = selectedMode[1];
        const ingame = document.getElementById('ingame');
        ingame.style.width = level.numCols*20 + 'px';
        ingame.style.height = level.numRows*20 + 'px';
    }
    // 
    chooseMode();
};

var catsweeper = {
    numRows: level.numRows,
    numCols: level.numCols,
    init: function(elementID)  {
        // var self = this;
        $("#" + elementID).append(
            '<header class="logo-name">' +
            '<h1 class="name"><i class="fas fa-paw"></i> CATSWEEPER <i class="fas fa-paw"></i></h1>' +
            '</header>' +
            '<div class="settings">' +
                '<a href="#help"><i class="fas fa-question btn"></i></a>' +
                '<div class="mode" id="mode">' +
                    '<button onclick="chooseMode()">Easy 9x9 (10 cats)</button>' +
                    '<i class="bx bxs-down-arrow arrow" onclick="chooseMode()"></i>' +
                    '<div class="options" id="options">' +
                        '<option value="9x9x10" onclick="choose(this)">Easy 9x9 (10 cats)</option>' +
                        '<option value="16x16x40" onclick="choose(this)">Medium 16x16 (40 cats)</option>' +
                        '<option value="30x16x99" onclick="choose(this)">Hard 30x16 (99 cats)</option>' +
                        '<option value="30x30x180" onclick="choose(this)">Extreme 30x24 (180 cats)</option>' +
                        '<option value="0x0x0" onclick="choose(this)">Custom...</option>' +
                    '</div>' +
                '</div>' +
                '<a href="#setting"><i class="fas fa-gear btn"></i></a>' +
            '</div>' +
            '<div class="stats">' +
                '<value class="nCats val" id="nCats">0</value>' +
                '<icon class="game-icon" id="game-icon"> 😿😾 </icon>' +
                '<value class="time val" id="time">0</value>' +
            '</div>' +
            '<div class="ingame" id="ingame">' +                
            '</div>');
        // $("#" + elementID).newgame();
        // $("#ingame").newgame();
        
        document.getElementById("ingame").textContent = this.numRows;
    },

    


    newgame: function() {       
        document.getElementById("ingame").textContent = this.numRows;
    },
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

$(document).ready(function() {
	catsweeper.init('game-container');
});