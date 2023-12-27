var level = {
    numRows: 0,
    numCols: 0
}

var catsweeper = {
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
    },
    cell: "cell.png",
    defaultLevel:       "easy",
    currentLevel:       null,
    numCols:            null,
    numRows:            null,
    numCats:            null,
    mineCount:          null,
    numCells:           null,

    init: function(elementID)  {
        var self = this;
        $("#" + elementID).append(
            '<header class="logo-name">' + 
                '<h1 class="name"><i class="fas fa-paw"></i> CATSWEEPER <i class="fas fa-paw"></i></h1>' +
            '</header>' +
            '<div class="settings">' +
                '<a href="#help"><i class="fas fa-question btn" id="helpBtn"></i></a>' +
                '<div class="mode" id="mode">' +
                    '<button id ="chooseMode">Easy 9x9 (10 cats)</button>' +
                    '<i class="bx bxs-down-arrow arrow" id="arrow"></i>' +
                    '<div class="options" id="options">' +
                        '<option value="9x9x10">Easy 9x9 (10 cats)</option>' +
                        '<option value="16x16x40">Medium 16x16 (40 cats)</option>' +
                        '<option value="30x16x99">Hard 30x16 (99 cats)</option>' +
                        '<option value="30x30x180">Extreme 30x24 (180 cats)</option>' +
                        '<option value="0x0x0">Custom...</option>' +
                    '</div>' +
                '</div>' +
                '<a href="#setting"><i class="fas fa-gear btn" id="settingBtn"></i></a>' +
            '</div>'  +
            '<div id="custom-container">' +
                '<div id="custom-wrapper">' +
                    '<div class="custom">' +
                        '<span>ROWS</span>' +
                        '<input type="text" oninput="validateInput(this)" maxlength="2" id="custom-rows">' +
                    '</div>' +
                    '<div class="custom">' +
                        '<span>COLS</span>' +
                        '<input type="text" oninput="validateInput(this)" maxlength="2" id="custom-cols">' +
                    '</div>' +
                    '<div class="custom">' +
                        '<span>CATS</span>' +
                        '<input type="text" oninput="validateInput(this)" maxlength="2" id="custom-cats">' +
                    '</div>' +
                '</div>' +
                '<div id="custom-btns">' +
                    '<button id="ok-btn">OK</button>' +
                    '<button id="cancel-btn">CANCEL</button>' +
                '</div>' +
            '</div>' +
            '<div class="stats">' +
                '<value class="nCats val" id="nCats">05</value>' +
                '<icon class="game-icon" id="game-icon"> 😿😾 </icon>' +
                '<value class="time val" id="time">30</value>' +
            '</div>' +            
                '<div class="ingame" id="ingame">' +                
            '</div>' +
            
            '<div class="game-setting" id="gameSetting">' +
                '<header class="logo-name">' +
                    '<h1 class="name">' +
                        '<i class="fa-solid fa-gear"></i> SETTING <i class="fa-solid fa-gear"></i>' +
                        '<div class="line"></div>' +
                    '</h1>' +
                '</header>' +
                '<div class="setting-options">' +
                    '<a href="#" class="saveGame"><i class="fa-solid fa-floppy-disk setting-icon"></i> Save Game <i class="fa-solid fa-floppy-disk"></i></a>' +
                    '<a href="#" class="newGame"><i class="fa-solid fa-square-plus setting-icon"></i> New Game <i class="fa-solid fa-square-plus"></i></a>' +
                    '<a href="#" class="showHighScores"><i class="fa-solid fa-star setting-icon"></i> Show High Scores<i class="fa-solid fa-star"></i></a>' +
                    '<a href="#" class="exitGame"><i class="fa-solid fa-door-open setting-icon"></i> Exit <i class="fa-solid fa-door-open"></i></a>' +
                '</div>' +
                '<div class="sound-options">' +
                    '<a href="#musicOptions"><i class="fa-solid fa-volume-xmark btn" id="musicOptions"></i></a>' +
                '</div>' +
            '</div>' +

            '<div class="game-help" id="gameHelp">' +
                '<header class="logo-name">' +
                    '<h1 class="name">' +
                        '<i class="fa-solid fa-question"></i></i> HELP <i class="fa-solid fa-question"></i>' +
                        '<div class="line"></div>' +
                    '</h1>' +
                '</header>' +
                '<div class="icon-description">' +
                    '<div class="icon-button">' +
                        '<img class="red-flag">' +
                        '<p>Right click or alt</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img class="new-game">' +
                        '<p>New Game</p>' +
                    '</div>' +
                    '<div class="icon-button">' + 
                        '<img class="undo">' +
                        '<p>Undo</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img class="lost">' +
                        '<p>Cat (Bomb)</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img class="remain">' +
                        '<p>Remaining Cats</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<p><b>Save Game</b> is in <b>Setting</b></p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img class="catBox">' +
                        '<p>(Left) Number of Cats</p>' +
                    '</div>' +
                    '<div class="icon-button">' +
                        '<img class="timeBox">' +
                        '<p>(Right) Time</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<audio id="background-music" loop>' +
                '<source src="bg/BGM.mp3" type="audio/mpeg" />' +
            '</audio>'
            );
        
        var $chooseMode = $("#chooseMode"),
            $arrow = $(".arrow"),
            $options = $("#options option"),
            $settingBtn = $("#settingBtn"),
            $helpBtn = $("#helpBtn"),
            // const settingCloseBtn = document.querySelector(".game-setting .icon-close");
            // const helpCloseBtn = document.querySelector(".game-help .icon-close");
            $gameSetting = $("#gameSetting"),
            $gameHelp = $("#gameHelp"),
            $gameContainer = $(".game-container");

        // function to choose mode of game, including dropdown
        $chooseMode.on('click', this.chooseMode.bind(this));
        $arrow.on('click', this.chooseMode.bind(this));
        $options.on('click', function() {
            self.choose(this);
        });

        //
        $settingBtn.on("click", function() {
            if (!$gameHelp.hasClass("display")) {
                $gameSetting.addClass("display");
                $gameContainer.addClass("dimmed");
            }
        });
        $helpBtn.on("click", function() {            
            if (!$gameSetting.hasClass("display")) {
                $gameHelp.addClass("display");
                $gameContainer.addClass("dimmed");
            }
        });
        $(document).on("click", function(event) {
            if (!$gameSetting.is(event.target) && !$gameSetting.has(event.target).length &&
                !$settingBtn.is(event.target) && !$settingBtn.has(event.target).length) {
                $gameSetting.removeClass("display");
                $gameContainer.removeClass("dimmed");
            }
        });
        $(document).on("click", function(event) {
            if (!$gameHelp.is(event.target) && !$gameHelp.has(event.target).length &&
                !$helpBtn.is(event.target) && !$helpBtn.has(event.target).length) {
                $gameHelp.removeClass("display");
                $gameContainer.removeClass("dimmed");
            }
        });
        var musicOn = 1,
            $musicOptions = $("#musicOptions");
        $musicOptions.on("click", function() {
            if (musicOn == 1) {
                $("background-music").pause();
            }
        })
        
        var musicOn = 1;

    $("#musicOptions").on("click", function() {
        var backgroundMusic = $("#background-music")[0]; // Use [0] to get the DOM element from the jQuery object

        if (musicOn === 1) {
            backgroundMusic.pause();
            musicOn = 0;
        } else {
            backgroundMusic.play();
            musicOn = 1;
        }
    });



        // const settingBtn = document.getElementById("settingBtn");
        // const helpBtn = document.getElementById("helpBtn")
        // const settingCloseBtn = document.querySelector(".game-setting .icon-close");
        // const helpCloseBtn = document.querySelector(".game-help .icon-close");
        // const gameSetting = document.getElementById("gameSetting");
        // const gameHelp = document.getElementById("gameHelp");
        // const gameContainer = document.querySelector(".game-container");
        // settingBtn.addEventListener("click", () => {
        //     if (!gameHelp.classList.contains("display")) {
        //         gameSetting.classList.add("display");
        //         gameContainer.classList.add("dimmed");
        //     }
        // });
        // helpBtn.addEventListener("click", () => {
        //     if (!gameSetting.classList.contains("display")) {
        //         gameHelp.classList.add("display");
        //         gameContainer.classList.add("dimmed");
        //     }
        // });
        // document.addEventListener("click", (event) => {
        //     if (!gameSetting.contains(event.target) && !settingBtn.contains(event.target)) {
        //         gameSetting.classList.remove("display");
        //         gameContainer.classList.remove("dimmed");
        //     }
        // });
        // document.addEventListener("click", (event) => {
        //     if (!gameHelp.contains(event.target) && !helpBtn.contains(event.target)) {
        //         gameHelp.classList.remove("display");
        //         gameContainer.classList.remove("dimmed");
        //     }
        // });
        // var musicOn = 1;
        // document.getElementById("musicOptions").addEventListener("click", () => {
        //     if (musicOn == 1) {
        //         document.getElementById("background-music").pause();
        //         musicOn = 0;
        //     } else {
        //         document.getElementById("background-music").play();
        //         musicOn = 1;
        //     }
        // });
    },

    chooseMode: function() {
        var mode = document.getElementById("mode").getElementsByClassName("options")[0];
        mode.style.display = (mode.style.display === "block") ? "none" : "block";
    },

    choose: function(option) {
        var btn = document.getElementById("mode").getElementsByTagName("button")[0];
        btn.textContent = $(option).text();
        //change game size depending on mode
        if (option.value != "0x0x0")   {
            const selectedMode = option.value.split('x');
            this.numCols = selectedMode[0];
            this.numRows = selectedMode[1];
            const ingame = document.getElementById('ingame');
            ingame.style.width = this.numCols*20 + 'px';
            ingame.style.height = this.numRows*20 + 'px';
        }
        else {            
            ingame.style.width = 15*20 + 'px';
            ingame.style.height = 10*20 + 'px';
        }
        this.chooseMode();
    },


    newgame: function() {       
        document.getElementById("ingame").textContent = this.numRows;
    },
}



$(document).ready(function() {
	catsweeper.init("game-container");
});