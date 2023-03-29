const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

// Creating a Window. NOTE: this only be created after the app module's ready event if fired.
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {preload: path.join(__dirname, 'preload.js')} 
    })
    win.loadFile("index.html");
}

function handleSetTitle(event, title){
    const webContents = event.sender;
    const win = BrowserWindow.fromBrowserView(webContents);
    win.setTitle(title);
}

// Loading Window
// whenReady wait for ready event is fired.
app.whenReady().then(() => {
    ipcMain.on('set-title', handleSetTitle);
    createWindow();
})
