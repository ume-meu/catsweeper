const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWin;

app.on('ready', function(){
    //create new window
    mainWin = new BrowserWindow({
        width: 1000,
        height: 750
    });
    //load html file
    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWin.html'),
        protocol: 'file',
        slashes: true
    }));
});

