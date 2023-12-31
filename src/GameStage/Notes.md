

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
    numRowsActual:      null, // 2 more than visible rows to add extra invisible surrounding cell layer to 
    numColsActual:      null, // board. This avoids the need to check for boundaries in DFS revealCell method
    target:             null, // target where game board goes into (defaults to body if none supplied in init())
    cells:              [], // array of cell objects
    safeCells:          [], // array of cells without mines
    mineCells:          [], // array of cells with mines
    flagStates:         [ 'covered', 'flag', 'question' ], // right click states for covered cells
    numFlagStates:      null,
    includeMarks:       true,
    madeFirstClick:     false,
    stopTimerID:        0, // used to cancel setTimeout used for timer
    timer:              0,
    gameInProgress:     false,
	won:				false,
    mouseDown:          false,
    gameInitialized:    false,
    customDialogOpen:   false,

    /* DOM elements */
    // $windowWrapperOuter:    null,
    $resetButton:           null,
    $mineCountOnes:         null,
    $mineCountTens:         null,
    $mineCountHundreds:     null,
    $timerOnes:             null,
    $timerTens:             null,
    $timerHundreds:         null,
    $ingame:             null,

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
                            '<button id="custom-ok">OK</button>' +
                            '<button id="custom-cancel">CANCEL</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<a href="#setting"><i class="fas fa-gear btn" id="settingBtn"></i></a>' +
            '</div>' +
            '<div class="stats">' +
                '<value class="nCats val" id="nCats">05</value>' +
                '<icon class="game-icon" id="game-icon"> 😿😾 </icon>' +
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

        this.$ingame = $('#ingame')
        
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
        $chooseMode.bind('click', function() {
            self.chooseMode();
        });      
        $arrow.bind('click', function() {
            self.chooseMode();
        });      
        $options.on('click', function() {
            self.choose(this);
            console.log(self.numCols, self.numRows);
        });
        $customRowsTxt.add($customColsTxt).add($customCatsTxt).bind('keyup', function() {
            if (/\D/g.test($(this).val())) 
                $(this).val('');
        });
        
        $customOKBtn.bind('click', function() {
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
            ingame.style.width = rows*20 + 'px';
            ingame.style.height = cols*20 + 'px';              
            var btn = document.getElementById("mode").getElementsByTagName("button")[0];
            btn.textContent = "Custom (" + $customRowsTxt.val() + "x" + $customColsTxt.val() + "x" + $customCatsTxt.val() + ")";      
        });
        $customCancelBtn.bind('click', function() {
            $customContainer.hide();
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

        this.newGame( this.defaultLevel );
        this.gameInitialized = true;

    },

    //

    newgame: function() {       
        document.getElementById("ingame").textContent = this.numRows;
    },
    newGame: function(level, numRows, numCols, numCats, reset) {
        var reset = reset || false;
        // check if the game is initialized or not to stop the current game
        if (this.gameInitialized) {
            this.stop();
        }
        
        // Resetting 
        if (resetting) {
            var cell, i, j;

            // reset cells 
            for (i = 1; i <= this.numRows; i++) {
                for (j = 1; j <= this.numCols; j++) {
                    cell = this.cells[i][j];

                    cell.$elem.attr('class', 'covered');
                    cell.classUncovered = 'mines0';
                    cell.hasMine = false;
                    cell.numSurroundingMines = 0;
                    cell.flagStateIndex = 0; 
                    // 0 = covered, 1 = flag, 2 = question
                }
            }
        }
        // New Game (not Resetting)
        else {
            if (level == 'custom') {
                this.numRows = numRows;
                this.numCols = numCols;
                this.numMines = numMines;
                this.mineCount = numMines;
            }
            else {
                var levelObj =  this.levels[level];
                this.numRows =  levelObj.rows;
                this.numCols =  levelObj.cols;
                this.numMines = levelObj.mines;
            }
            this.numCells =         this.numRows * this.numCols;
            this.numRowsActual =    this.numRows + 2;
            this.numColsActual =    this.numCols + 2;
            this.currentLevel = level;

            // // set board width based on number of rows and columns
            // this.$windowWrapperOuter.css('width', this.cellWidth * this.numCols + 27); // additional pixels to account for borders
            
            // 2d cells array
            this.cells = new Array(this.numRowsActual);
            
            for ( i = 0; i < this.numRowsActual; i++ ) {
                this.cells[i] = new Array(this.numColsActual);
            }
            
            // clear ingame cell elements
            this.$ingame.html('');


            for ( i = 0; i < this.numRowsActual; i++ ) {
                for ( j = 0; j < this.numColsActual; j++ ) {
                    if ( !(i < 1 || i > this.numRows || j < 1 || j > this.numCols) ) {
                        $elem = $(document.createElement('div'))
                            .attr('class', 'covered');
                        
                        this.$minefield.append($elem);
                    } else {
                        $elem = null;
                    }
                    
                    // fill cells array element
                    this.cells[i][j] = {
                        $elem: $elem,
                        covered: false, // we initialize all to false and later set visible ones to true (during setting of click events)
                        classUncovered: 'mines0',
                        hasMine: false,
                        numSurroundingMines: 0,
                        flagStateIndex: 0 // 0 = covered, 1 = flag, 2 = question
                    }
                }
            } // end for (outer)
        }

        this.setMineCount( this.numMines );
        
        this.setTimer( 0 );
        
        this.layMines();        
        
        // calculate and set number of surrounding mines for each cell
        this.calcMineCounts();
        
        this.setClickEvents();
        
        this.madeFirstClick = false;
        
        this.$resetButton.attr('class', 'face-smile');

    }

    setClickEvents: function() {
        for (i = 1; i <= this.numRows; i++) {
            for (j = 1; j <= this.numCols; j++) {
                var self = this,
                    cell = self.cells[i][j];
                
                cell.covered = true;
                cell.$elem.bind
                cell.$elem.bind('mousedown', {_i: i, _j: j, _cell: cell}, function(e) {
                    self.mouseDown = true;
                    
                    var d       = e.data,
                        _cell   = d._cell;
                    
                    // only do something if cell is covered
                    if ( _cell.covered ) {
                        // right mousedown
                        if (e.which === 3) {
                            // if this was a flag, means flag will be removed, so increment mine count
                            if (_cell.flagStateIndex == 1) {
                                self.setMineCount( self.mineCount + 1 );
                            }
                            
                            // cycle flagStateIndex
                            _cell.flagStateIndex = (_cell.flagStateIndex + 1) % self.numFlagStates;
                            
                            // if this becomes a flag, means flag added, so decrement mine count 
                            if (_cell.flagStateIndex == 1) {
                                self.setMineCount( self.mineCount - 1 );
                            }
                            
                            // set new cell class
                            _cell.$elem.attr('class', self.flagStates[ (_cell.flagStateIndex) ]);
                        } else {
                            // left mousedown
                            
                            if ( _cell.covered && _cell.flagStateIndex !== 1) {
                                self.$resetButton.attr('class', 'face-surprised');
                                _cell.$elem.attr('class', 'mines0');
                            }
                        } // end left mousedown
                    } // end if covered
                }).bind('mouseover', {_cell: cell}, 
            }
        }
    }
}



$(document).ready(function() {
	catsweeper.init("game-container");
});