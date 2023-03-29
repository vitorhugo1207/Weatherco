const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

// Creating a Window. NOTE: this only be created after the app module's ready event if fired.
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile("index.html");
}

// Loading Window
// whenReady wait for ready event is fired.
app.whenReady().then(() => {
    createWindow();
})

ipcMain.on('GetforecastJSON', async(event) => {
    const Weather = require(__dirname + '/weather.js');
    const weather = new Weather();

    event.sender.send('forecastJSON', await weather.forecastJSON());
})
