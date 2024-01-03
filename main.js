const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWin;

// Listen for app to be ready
app.on('ready', function(){
    //open window
    mainWin = new BrowserWindow({        
        width: 1300, 
        height: 1000, 
        icon: path.join(__dirname, 'resources/icons/logo.png'),
        resizable: false
    });
    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, 'src/GameStage/menuState.html'),
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

