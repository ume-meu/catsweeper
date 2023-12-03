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
    flags: ['covered', 'flag', 'question'] 
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
        const width = selectedMode[0];
        const height = selectedMode[1];
        const ingame = document.getElementById('ingame');
        ingame.style.width = width*20 + 'px';
        ingame.style.height = height*20 + 'px';
    }
    // 
    chooseMode();
};
// document.addEventListener("click", function(event) {
//     var mode = document.getElementById("mode");
//     var btn = mode.getElementsByTagName("button")[0];
//     var option = mode.getElementsByClassName("options")[0];

//     if (event.target !== btn && !mode.contains(event.target)) {
//         option.style.display = "none";
//     }
// });