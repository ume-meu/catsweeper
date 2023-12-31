

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
    catCount:           null,
    numCells:           null,
    numRowsActual:      null, // 2 more than visible rows to add extra invisible surrounding cell layer to 
    numColsActual:      null, // board. This avoids the need to check for boundaries in DFS revealCell method
    target:             null, // target where game board goes into (defaults to body if none supplied in init())
    cells:              [], // array of cell objects
    safeCells:          [], // array of cells without cats
    catCells:           [], // array of cells with cats
    flagStates:         ['covered', 'flag'], // right click states for covered cells
    numFlagStates:      null,
    madeFirstClick:     false,
    stopTimerID:        0, // used to cancel setTimeout used for timer
    timer:              0,
    intervalID:         null,
    seconds:            0,
    gameInProgress:     false,
	won:				false,
    mouseDown:          false,
    gameInitialized:    false,
    customDialogOpen:   false,

    /* DOM elements */
    // $windowWrapperOuter:    null,
    $resetBtn:          null,
    // $catCountOnes:      null,
    // $catCountTens:      null,
    // $catCountHundreds:  null,
    // $timerOnes:         null,
    // $timerTens:         null,
    // $timerHundreds:     null,
    $catCount:          null,
    $timeCount:         null,
    $ingame:            null,

    init: function(elementID)  {
        var self = this;
        // this.target = targetID ? '#' + targetID : 'body';
        // this.numFlagStates = self.flagStates.length;
        $("#" + elementID).append(
            '<header class="logo-name">' + 
                '<h1 class="name"><i class="fas fa-paw"></i> CATSWEEPER <i class="fas fa-paw"></i></h1>' +
            '</header>' +
            '<div class="settings" id="settings">' +
                '<a href="#help"><i class="fas fa-question btn" id="helpBtn"></i></a>' +
                '<div class="relative">' +
                    '<div class="mode" id="mode">' +
                        '<button id ="chooseMode">Easy 9x9 (10 cats)</button>' +
                        '<i class="bx bxs-down-arrow arrow" id="arrow"></i>' +
                        '<div class="options" id="options">' +
                            '<option id="easy-mode" value="9x9x10">Easy 9x9 (10 cats)</option>' +
                            '<option id="medium-mode" value="16x16x40">Medium 16x16 (40 cats)</option>' +
                            '<option id="hard-mode" value="30x16x99">Hard 30x16 (99 cats)</option>' +
                            '<option id="extreme-mode" value="30x24x180">Extreme 30x24 (180 cats)</option>' +
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
                                '<input type="text" maxlength="3" id="custom-cats">' +
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
            '<div class="stats" id="stats">' +
                '<value class="nCats val" id="cat-count">010</value>' +
                '<div class="reset" id="reset">' +
                    '<div class="cat-smile" id="reset-btn"></div>' +
                    '<div class="confirm-box" id="confirm-box">' +
                        '<p>Are you sure you want to restart the game?</p>' +
                        '<div id="btns">' +
                            '<button id="okReset">YES</button>' +
                            '<button id="cancelReset">NO</button>' +
                        '</div>' +
                    '</div>' +
                    '<div id="overlay"></div>' +
                '</div>' +
                '<value class="time val" id="time-count">000</value>' +
            '</div>' +
            '<div id="ingame"></div>' +            
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
                '<source src="resources/sounds/BGM.mp3" type="audio/mp3" />' +
            '</audio>'
            );
        
        // DOM elements to be used
        var $ingame = $("#ingame");

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
            $customCancelBtn = $("#custom-cancel"),
            $catCount = $("#cat-count");     
        
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
                catsweeper.numCols = selectedMode[0];
                catsweeper.numRows = selectedMode[1];
                catsweeper.numCats = selectedMode[2];
                const ingame = document.getElementById("ingame");
                ingame.style.width = catsweeper.numCols * 20 + 'px';
                ingame.style.height = catsweeper.numRows * 20 + 'px';
            } else if (option.value === "0x0x0") {
                const customContainer = document.getElementById("custom-container");
                customContainer.style.display = "flex";   
                catsweeper.numRows = $customRowsTxt.val();             
                catsweeper.numCols = $customColsTxt.val();
                catsweeper.numCats = $customCatsTxt.val();
                // btn.textContent = "Custom (" + $customRowsTxt.val() + "x" + $customColsTxt.val() + "x" + $customCatsTxt.val() + ")";                    
            }
            if (option.value === "9x9x10")  self.newGame("easy");
            else if (option.value === "16x16x40")  self.newGame("medium");
            else if (option.value === "30x16x99")   self.newGame("hard");
            else if (option.value === "30x24x180")  self.newGame("extreme");
            $catCount.text(("000" + catsweeper.numCats).slice(-3));
            $customRowsTxt.val(catsweeper.numRows);
            $customColsTxt.val(catsweeper.numCols);
            $customCatsTxt.val(catsweeper.numCats);
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
        // custom mode
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
            var catCount = ("000" + cats).slice(-3);
            $catCount.text(catCount);
            self.newGame('custom', rows, cols, cats, catCount);
        });
        $customCancelBtn.bind("click", function() {
            $customContainer.hide();
        });

        // function for asking to reset game
        var $resetBtn = $("#reset-btn"),
            $okResetBtn = $("#okReset"),
            $cancelResetBtn = $("#cancelReset"),
            $timeCount = $("#time-count"),
            resetting = false; 
            
        $resetBtn.bind("mousedown", function(e) {
            this.mouseDown = true;
            if (e.which === 3)  {
                return false;
            }
            $resetBtn.attr("class", "cat-pressed");
        }).bind("mouseup", function(e) {
            this.mouseDown = false;
            if (e.which === 3)  {
                return false;
            }            
            $resetBtn.attr("class", "cat-smile");
        }).on("click", function() {           
            setTimeout(function () {
                document.getElementById("reset-btn").style.display = "none";
                document.getElementById("confirm-box").style.display = "block";
                document.getElementById("overlay").style.display = "block";
            }, 500); 
        });
        function timer() {            
            $timeCount.text("000");
            var intervalID = catsweeper.intervalID;
            if (intervalID) {
                clearInterval(intervalID);
            }
            catsweeper.seconds = 0; 
            intervalID = setInterval(function () {
                catsweeper.seconds++;
                var count = ("000" + catsweeper.seconds).slice(-3);
                $timeCount.text(count);
            }, 1000);
        }
        $okResetBtn.on("click", function() {
            catsweeper.resetting = true;
            document.getElementById("reset-btn").style.display = "block";
            document.getElementById("confirm-box").style.display = "none";
            document.getElementById("overlay").style.display = "none";
            timer();
        });
        $cancelResetBtn.on("click", function() {            
            document.getElementById("reset-btn").style.display = "block";
            document.getElementById("confirm-box").style.display = "none";
            document.getElementById("overlay").style.display = "none";
        });
        
        // setting and help
        var $settingBtn = $("#settingBtn"),
            $helpBtn = $("#helpBtn"),
            $gameSetting = $("#gameSetting"),
            $gameHelp = $("#gameHelp"),
            $gameContainer = $(".game-container");    
            
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

        // function to show the highest score of a mode

        // function to ask for saving game after clicking on "exit"

        // disable some actions
        this.$("#settings").add($("#stats")).add($("#ingame")).add($("#gameSetting")).add($("#gameHelp")).bind('contextmenu dragstart drag', function() {
            return false;
        });

        //
        var musicOn = 1,
            $musicOptions = $("#musicOptions");
        $musicOptions.on("click", function() {
            if (musicOn == 1) {
                $("background-music").pause();
            }
        })
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

        // this.$ingame = $('#ingame')
        this.newGame(this.defaultLevel);
        this.gameInitialized = true;
        
    },
    
    newGame: function(level, numRows, numCols, numCats, catCount, reset) {
        var reset = reset || false;
        // check if the game is initialized or not to stop the current game
        if (this.gameInitialized) {
            this.stop();
        }        
        // resetting 
        if (reset) {
            var cell, i, j;
            // reset cells 
            for (i = 1; i <= this.numRows; i++) {
                for (j = 1; j <= this.numCols; j++) {
                    cell = this.cells[i][j];
                    cell.$elem.attr('class', 'covered');
                    cell.classUncovered = 'cats0';
                    cell.hasCat = false;
                    cell.numSurroundingCats = 0;
                    cell.flagStateIndex = 0; // 0 = covered, 1 = flag
                }
            }
        }
        // New Game (not resetting)
        else {
            if (level == 'custom') {
                this.numRows = numRows;
                this.numCols = numCols;
                this.numCats = numCats;
                this.catCount = catCount;
            }
            else {
                var levelMode =  this.levels[level];
                this.numRows =  levelMode.rows;
                this.numCols =  levelMode.cols;
                this.numCats = levelMode.cats; 
            }
            this.numCells =         this.numRows * this.numCols;
            this.numRowsActual =    this.numRows + 2;
            this.numColsActual =    this.numCols + 2;
            this.currentLevel = level;


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
                        
                        this.$ingame.append($elem);
                    } else {
                        $elem = null;
                    }
                    
                    // fill cells array element
                    this.cells[i][j] = {
                        $elem: $elem,
                        covered: false, // we initialize all to false and later set visible ones to true (during setting of click events)
                        classUncovered: 'cats0',
                        hasCat: false,
                        numSurroundingCats: 0,
                        flagStateIndex: 0 // 0 = covered, 1 = flag
                    }
                }
            } // end for (outer)
        }

        // Turn this off until each cell is clickable 
        // this.setCatCount( this.numCats );
        // this.setTimer( 0 );
        
        this.layCats();        
        
        // calculate and set number of surrounding cats for each cell
        this.calcCatCounts();
        
        this.setClickEvents();
        
        this.madeFirstClick = false;
        
        this.$resetBtn.attr('class', 'new');

    }, 

    setClickEvents: function() {
        for ( i = 1; i <= this.numRows; i++ ) {
            for ( j = 1; j <= this.numCols; j++ ) {
                var self = this,
                    cell = self.cells[i][j];
                
                cell.covered = true;
                cell.$elem.bind('mousedown', {_i: i, _j: j, _cell: cell}, function(e) {
                    self.mouseDown = true;
                    
                    var d       = e.data,
                        _cell   = d._cell;
                    
                    if ( _cell.covered ) {
                        // right mousedown
                        if (e.which === 3) {
                            // if this was a flag, means flag will be removed, so increment cat count
                            if (_cell.flagStateIndex == 1) {
                                self.setCatCount( self.catCount + 1 );
                            }
                            
                            // cycle flagStateIndex
                            _cell.flagStateIndex = (_cell.flagStateIndex + 1) % self.numFlagStates;
                            
                            // if this becomes a flag, means flag added, so decrement cat count 
                            if (_cell.flagStateIndex == 1) {
                                self.setCatCount( self.catCount - 1 );
                            }
                            
                            // set new cell class
                            _cell.$elem.attr('class', self.flagStates[ (_cell.flagStateIndex) ]);
                        } else {
                            // left mousedown
                            
                            if ( _cell.covered && _cell.flagStateIndex !== 1) {
                                self.$resetBtn.attr('class', 'surprised');
                                _cell.$elem.attr('class', 'cats0');
                            }
                        } // end left mousedown
                    } // end if covered
                }).bind('mouseover', {_cell: cell}, function(e) {
                    if (self.mouseDown) {
                        var _cell = e.data._cell;
                        _cell.$elem.mousedown();
                    }
                }).bind('mouseout', {_cell: cell}, function(e) {
                    if (self.mouseDown) {
                        var _cell = e.data._cell;                        
                        if (_cell.covered) _cell.$elem.attr('class', 'covered');
                    }
                }).bind('mouseup', {_i: i, _j: j, _cell: cell}, function(e) {
                    self.mouseDown = false;
                    
                    var d       = e.data,
                        _i      = d._i,
                        _j      = d._j,
                        _cell   = d._cell;
                        
                    self.$resetBtn.attr('class', 'new');
                    
                    // cell is still covered and not flagged
                    if ( _cell.covered && _cell.flagStateIndex !== 1 ) {
                        // left mouse click
                        if (e.which !== 3) {
                            // on first click, make sure cell does not have a cat;
                            if (!self.madeFirstClick) {
                                self.madeFirstClick = true;
                                self.start();
                                
                                // if cell has cat, move cat and update surrounding cats numbers
                                if (_cell.hasCat) {
                                    self.moveCat( _i, _j );
                                }

                                // to guarantee that the first click will always
                                // open the cell that have no cats around, we will move
                                // itself, and then move 8 cells around it
                                for (var h = _i-1; h <= _i+1; h++) {
                                    for (var g = _j-1; g <= _j+1; g++) {
                                        if (h == _i && g == _j) continue;
                                        var outterCell = self.cells[h][g];
                                        if (outterCell.hasCat) {
                                            self.moveCat(h, g);
                                        }
                                    }
                                }
                                // reveal the clicked cell that has no cats around it
                                self.revealCells(_i, _j);

                            } // end if first click
                            
                            // user clicks cat and loses
                            if (_cell.hasCat) {
                                _cell.classUncovered = 'cat-hit';
                                self.lose();
                            } else {
                                self.revealCells( _i, _j );
                                
                                // check if player win
                                if ( self.checkForWin() ) {
                                    self.win();
                                }  
                            }
                        } 
                    }
                }); 
            } 
        }  
    }, 
    layCats: function() {
        var rowCol,
            cell,
            i;
        
        // designate cat spots
        this.designateCatSpots();
        
        for ( i = 0; i < this.numCats; i++ ) {
            rowCol = this.numToRowCol( this.catCells[i] );
            cell = this.cells[ rowCol[0] ][ rowCol[1] ];            
            cell.hasCat = true;
            cell.classUncovered = 'cat';
        }
    },   
    // designate unique random cat spots and store in this.catCells
    designateCatSpots: function() {
        this.safeCells = [];
        this.catCells = []
        
        var i,
            randIndex;

        i = this.numCells;
        while ( i-- ) {
            this.safeCells.push( i + 1 );
        }
        
        i = this.numCats;
        while ( i-- ) {
            randIndex = -~( Math.random() * this.safeCells.length ) - 1;
            this.catCells.push( this.safeCells[randIndex] );
            this.safeCells.splice( randIndex, 1 ); // remove cell from array of safe cells
        }        
    }, // end designateCatSpots
//----------------------------------------------------------------------
    // calculate and set surrounding cat count of a cell
    calcCatCount: function( row, col ) {
        var count = 0,
            cell = this.cells[row][col],
            i, 
            j;
        
        for (i = row - 1; i <= row + 1; i++) {
            for (j = col - 1; j <= col + 1; j++) {
                if (i == row && j == col) { continue; }
                if (this.cells[i][j].hasCat) { count++; }
            }
        }
        
        cell.numSurroundingCats = count;
        
        if (!cell.hasCat) { 
            cell.classUncovered = 'cats' + count;
        }
    }, // end calcCatCount
//----------------------------------------------------------------------

    // calculate and set surrounding cat count for each cell
    calcCatCounts: function() {
        for ( var i = 1; i <= this.numRows; i++ ) {
            for ( var j = 1; j <= this.numCols; j++ ) {
                this.calcCatCount( i, j );
            }
        }
    },

//----------------------------------------------------------------------

    changeCatCount: function( row, col, numToAdd ) {
        // leave 3rd argument empty to increment, pass in -1 to decrement
        var numToAdd = numToAdd || 1,
            cell = this.cells[row][col];
            newCatCount = cell.numSurroundingCats + numToAdd;
        
        cell.numSurroundingCats = newCatCount;
        
        if (!cell.hasCat) {
            cell.classUncovered = 'cats' + newCatCount;
        }
    },

//----------------------------------------------------------------------

    changeSurroundingCatCounts: function( row, col, numToAdd ) {
        for (i = row - 1; i <= row + 1; i++) {
            for (j = col - 1; j <= col + 1; j++) {
                // applying to surrounding cells, but we skip actual cell
                if (i == row && j == col) continue;
                
                this.changeCatCount( i, j, numToAdd );
            }
        }
    },
    
//----------------------------------------------------------------------
    
    // move cat from given cell (row, col)
    moveCat: function( row, col ) {
        var cell = this.cells[row][col],
            spot = this.rowColToNum( row, col );
        
        // remove cat from this cell
        cell.hasCat = false;
        cell.classUncovered = 'cats' + cell.numSurroundingCats;
        
        // remove spot from catCells and add to safeCells
        this.catCells.splice( $.inArray(spot, this.catCells), 1 );
        this.safeCells.push( spot );
        
        // decrement surrounding cat count of this cell
        this.changeSurroundingCatCounts( row, col, -1 );
        
        /* place cat in another random safe cell */
        var newIndex    = -~( Math.random() * this.safeCells.length ) - 1,
            newSpot     = this.safeCells[newIndex],
            newRowCol   = this.numToRowCol( newSpot );  
        if (newRowCol[0] == row-1) {
            newRowCol[0]--;
        }   
        else if (newRowCol[0] == row+1) {
            newRowCol[0]++;
        }   
        if (newRowCol[1] == col+1) {
            newRowCol[1]++;
        }   
        else if (newRowCol[1] == col-1) {
            newRowCol[1]--;
        }                       
        var newCatCell = this.cells[ newRowCol[0] ][ newRowCol[1] ];

        newCatCell.hasCat = true;
        newCatCell.classUncovered = 'cat';
        
        // remove new spot from safeCells and add to catCells
        this.safeCells.splice( $.inArray(newSpot, this.safeCells), 1 );
        this.catCells.push( newSpot );
        
        // increment surrounding cat count of new cat cell
        this.changeSurroundingCatCounts( newRowCol[0], newRowCol[1], 1 );
    },

//----------------------------------------------------------------------

    revealCats: function( won ) {
        var cell,
            rowCol,
            won = won || false;
            i,
            j;
        
        
        for ( i = 0; i < this.numCats; i++ ) {
            rowCol = this.numToRowCol( this.catCells[i] );
            cell = this.cells[ rowCol[0] ][ rowCol[1] ];
            
            if ( won ) {
                // flag cat cell if not already flagged
                if ( cell.flagStateIndex !== 1 ) {
                    cell.flagStateIndex = 1;
                    cell.$elem.attr('class', 'flag');
                }
            } else {
                // if cell is flagged and there's no cat, mark as misflagged
                if ( cell.flagStateIndex === 1 && !cell.hasCat) {
                    cell.$elem.attr('class', 'cat-misflagged');
                } else if ( cell.hasCat ) {
                    cell.$elem.attr('class', cell.classUncovered);
                }
            }
        }
    },
    
//----------------------------------------------------------------------

    flagCats: function() {
        this.revealCats( true );
    },

//----------------------------------------------------------------------
    
    // recursive method
    // DFS will be implemented here
    neighborX: [0, 0, 1, -1, 1, -1, 1, -1],
    neighborY: [1, -1, 0, 0, 1, 1, -1, -1],
    revealCells: function( row, col ) {
        var cell = this.cells[row][col], testCell, i, x, y;
        
        // reveal cell
        cell.$elem.attr('class', cell.classUncovered);
        cell.covered = false;
        
        // recursion escape condition:
        // If surrounding cat count is greater than 0, don't recurse, just return.
        if (cell.numSurroundingCats > 0) {
            return;
        } else {
            /* if surrounding cat count is 0, recursively go through all 
                adjacent cells with cat count 0 and reveal surrounding cells */
            for (i = 0; i < 8; i++) {
                x = row + this.neighborX[i];
                y = col + this.neighborY[i];
                testCell = this.cells[x][y];
                if (!testCell.covered) {
                	continue;    
                }
				this.revealCells(x, y);
            }

        } // end else
    },
//-----------------------------------
    
    numToRowCol: function( num ) {
        return [ Math.ceil(num/this.numCols), (num % this.numCols) || this.numCols ];
    },

//-----------------------------------
    
    rowColToNum: function( row, col ) {
        return (row - 1) * this.numRows + col;
    },

//-----------------------------------

    start: function() {
        this.gameInProgress = true;
        this.setTimer( 1 ); // start at 1 second, not 0
        this.runTimer();
    },

//-----------------------------------

    stop: function() {
        this.stopTimer();
        this.gameInProgress = false;
        
        // remove cell click events
        for ( var i = 1; i <= this.numRows; i++ ) {
            for ( var j = 1; j <= this.numCols; j++ ) {
                this.cells[i][j].$elem.unbind('click mouseup mousedown');
            }
        }
    },
    
//-----------------------------------

    reset: function() {
        this.newGame( null, null, null, null, true );
    },
    
//-----------------------------------

    setTimer: function( num, settingCatCount ) {
        var settingCatCount = settingCatCount || false,
            onesElem =      settingCatCount ? this.$catCountOnes      : this.$timerOnes,
            tensElem =      settingCatCount ? this.$catCountTens      : this.$timerTens,
            hundredsElem =  settingCatCount ? this.$catCountHundreds  : this.$timerHundreds,
            ones = Math.abs( num % 10 ),
            tens = Math.abs( (num / 10) % 10 | 0 ),
            hundreds = num < 0 ? 'm' : ( (num / 100) % 10 | 0 );
        
        if ( settingCatCount ) {
            this.catCount = num;
        } else {
            this.timer = num;
        }
        
        onesElem.attr('class', 't' + ones);
        tensElem.attr('class', 't' + tens);
        hundredsElem.attr('class', 't' + hundreds);
    },

//-----------------------------------

    setCatCount: function( num ) {
        this.setTimer( num, true );
    },

//-----------------------------------

    runTimer: function() {
        var self = this;
        
        this.stopTimerID = setTimeout(function() {
            if ( self.gameInProgress ) {
                // user loses if timer reaches 999
                if (self.timer > 998) {
                    self.lose();
                    return;
                }
                
                self.setTimer( ++self.timer );
                
                self.runTimer();
            }
        }, 1000);
    },

//-----------------------------------

    stopTimer: function() {
        clearTimeout( this.stopTimerID );
    },
    
//-----------------------------------

    lose: function() {
        this.stop();
        this.revealCats();
        this.$resetBtn.attr('class', 'face-sad');
    },
    
//-----------------------------------

    checkForWin: function() {
        var openCells = 0;
        
        for ( var i = 1; i <= this.numRows; i++ ) {
            for ( var j = 1; j <= this.numCols; j++ ) {
                if ( !this.cells[i][j].covered ) openCells++;
            }
        }
        
        return openCells === this.numCells - this.numCats;
    },
    
//-----------------------------------

    win: function() {
		this.won = true;
		this.stop();
		this.flagCats();
        this.$resetBtn.attr('class', 'cool');
        this.setCatCount( 0 );
		
		var self = this,
			levelId = 1; //self.levels[self.currentLevel].id;
		

    },
	
//-----------------------------------
}



$(document).ready(function() {
	catsweeper.init("game-container");
});