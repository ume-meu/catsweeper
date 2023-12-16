const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWin;

// Listen for app to be ready
app.on('ready', function(){
    //open window
    mainWin = new BrowserWindow({        
        width: 1000, // Set the width of the window
        height: 1000, // Set the height of the window
        resizable: false
    });
    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, 'src/GameStage/gameState.html'),
        protocol: 'file:',
        slashes: true
    }));

    const template = [];

    //Build menu template
    const mainMenu = Menu.buildFromTemplate(template);
    // const mainMenu = Menu.buildFromTemplate([{label: 'More'}]);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

