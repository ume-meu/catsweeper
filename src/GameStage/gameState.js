

var catsweeper = {
    levels: {
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
    },
    custom:     {
        // id: 4,
        minRows: 3,
        minCols: 3,
        minCats: 1,
        maxRows: 30, 
        maxCols: 30,
        maxCats: 225
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
                '<div class="relative">' +
                    '<div class="mode" id="mode">' +
                        '<button id ="chooseMode">Easy 9x9 (10 cats)</button>' +
                        '<i class="bx bxs-down-arrow arrow" id="arrow"></i>' +
                        '<div class="options" id="options">' +
                            '<option id="easy-mode" value="9x9x10">Easy 9x9 (10 cats)</option>' +
                            '<option id="medium-mode" value="16x16x40">Medium 16x16 (40 cats)</option>' +
                            '<option id="hard-mode" value="30x16x99">Hard 30x16 (99 cats)</option>' +
                            '<option id="extreme-mode" value="30x30x180">Extreme 30x24 (180 cats)</option>' +
                            '<option value="0x0x0">Custom...</option>' +
                        '</div>' +
                    '</div>' +                    
                    '<div id="custom-container">' +
                        '<div id="custom-wrapper">' +
                            '<div class="custom">' +
                                '<span>ROWS</span>' +
                                '<input type="text" maxlength="2" id="custom-rows">' +
                            '</div>' +
                            '<div class="custom">' +
                                '<span>COLS</span>' +
                                '<input type="text" maxlength="2" id="custom-cols">' +
                            '</div>' +
                            '<div class="custom">' +
                                '<span>CATS</span>' +
                                '<input type="text" maxlength="2" id="custom-cats">' +
                            '</div>' +
                        '</div>' +
                        '<div id="btns">' +
                            '<button id="custom-ok">OK</button>' +
                            '<button id="custom-cancel">CANCEL</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<a href="#setting"><i class="fas fa-gear btn" id="settingBtn"></i></a>' +
            '</div>' +
            '<div class="stats">' +
                '<value class="nCats val" id="nCats">05</value>' +
                '<div class="reset" id="reset">' +
                    '<button class="reset-btn" id="reset-btn">🐧</button>' +
                    '<div class="confirm-box" id="confirm-box">' +
                        '<p>Are you sure you want to restart the game?</p>' +
                        '<div id="btns">' +
                            '<button id="okReset">YES</button>' +
                            '<button id="cancelReset">NO</button>' +
                        '</div>' +
                    '</div>' +
                    '<div id="overlay"></div>' +
                '</div>' +
                '<value class="time val" id="time">30</value>' +
            '</div>' +
            '<div class="ingame" id="ingame"></div>' +
            
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
        
        // function to choose mode of game, including dropdown
        var $chooseMode = $("#chooseMode"),
            $arrow = $(".arrow"),
            $options = $("#options option"),
            $easyMode = $("#easy-mode"),
            $mediumMode = $("#medium-mode"),
            $hardMode = $("#hard-mode"),
            $extremeMode = $("#extreme-mode"),
            $customContainer = $("#custom-container"),
            $customRowsTxt = $("#custom-rows"),
            $customColsTxt = $("#custom-cols"),
            $customCatsTxt = $("#custom-cats"),
            $customOKBtn = $("#custom-ok"),
            $customCancelBtn = $("#custom-cancel");       
        
        $customRowsTxt.val(self.levels[self.defaultLevel].rows);
        $customColsTxt.val(self.levels[self.defaultLevel].cols);
        $customCatsTxt.val(self.levels[self.defaultLevel].cats);
        self.chooseMode = function() {
            var mode = document.getElementById("mode").getElementsByClassName("options")[0];
            mode.style.display = (mode.style.display === "block") ? "none" : "block";
        };          
        self.choose = function(option) {
            var btn = document.getElementById("mode").getElementsByTagName("button")[0];
            btn.textContent = $(option).text();
            if (option.value != "0x0x0") {
                const selectedMode = option.value.split("x");
                self.numCols = selectedMode[0];
                self.numRows = selectedMode[1];
                self.numCats = selectedMode[2];
                const ingame = document.getElementById("ingame");
                ingame.style.width = self.numCols * 20 + 'px';
                ingame.style.height = self.numRows * 20 + 'px';
            } else if (option.value === "0x0x0") {
                const customContainer = document.getElementById("custom-container");
                customContainer.style.display = "flex";
                btn.textContent = "Custom (" + $customRowsTxt.val() + "x" + $customColsTxt.val() + "x" + $customCatsTxt.val() + ")";     
            }
            $customRowsTxt.val(self.numRows);
            $customColsTxt.val(self.numCols);
            $customCatsTxt.val(self.numCats);
            self.chooseMode();
        };      
        $chooseMode.add($arrow).bind("click", function() {
            self.chooseMode();
        });      
        $options.on("click", function() {
            self.choose(this);
            console.log(self.numCols, self.numRows);
        });        
        $chooseMode.add($arrow).bind("click", function() {
            $customContainer.hide();
        });
        $customRowsTxt.add($customColsTxt).add($customCatsTxt).bind("keyup", function() {
            if (/\D/g.test($(this).val())) 
                $(this).val("");
        });        
        $customOKBtn.bind("click", function() {
            $customContainer.hide();
            var numRows = +$customRowsTxt.val(),
                numCols = +$customColsTxt.val(),
                numCats = +$customCatsTxt.val();
            var rows = numRows < self.custom.minRows ? self.custom.minRows : (numRows > self.custom.maxRows ? self.custom.maxRows : numRows);
            var cols = numCols < self.custom.minCols ? self.custom.minCols : (numCols > self.custom.maxCols ? self.custom.maxCols : numCols);
            var minCats = 1, 
                maxCats = Math.floor((rows*cols)*1/4),
                cats = numCats < minCats ? minCats : (numCats > maxCats ? maxCats : numCats);
            $customRowsTxt.val(rows);
            $customColsTxt.val(cols);
            $customCatsTxt.val(cats);
            ingame.style.width = rows*20 + "px";
            ingame.style.height = cols*20 + "px";              
            var btn = document.getElementById("mode").getElementsByTagName("button")[0];
            btn.textContent = "Custom (" + $customRowsTxt.val() + "x" + $customColsTxt.val() + "x" + $customCatsTxt.val() + ")";      
        });
        $customCancelBtn.bind("click", function() {
            $customContainer.hide();
        });

        // function for asking to reset game
        var $resetBtn = $("#reset-btn"),
            $okResetBtn = $("#okReset"),
            $cancelResetBtn = $("#cancelReset")
            resetting = false; 
        $resetBtn.on("click", function() {           
            document.getElementById("reset-btn").style.display = "none";
            document.getElementById("confirm-box").style.display = "block";
            document.getElementById("overlay").style.display = "block";
        });
        $okResetBtn.on("click", function() {
            self.resetting = true;
            document.getElementById("reset-btn").style.display = "block";
            document.getElementById("confirm-box").style.display = "none";
            document.getElementById("overlay").style.display = "none";
        })
        $cancelResetBtn.on("click", function() {            
            document.getElementById("reset-btn").style.display = "block";
            document.getElementById("confirm-box").style.display = "none";
            document.getElementById("overlay").style.display = "none";
        });
        
        // Setting and Help
        var $settingBtn = $("#settingBtn"),
            $helpBtn = $("#helpBtn"),
            $gameSetting = $("#gameSetting"),
            $gameHelp = $("#gameHelp"),
            $gameContainer = $(".game-container");       

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

    },

    //

    newgame: function() {       
        document.getElementById("ingame").textContent = this.numRows;
    },
}



$(document).ready(function() {
	catsweeper.init("game-container");
});