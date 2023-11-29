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
        cats: 160    
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