const { app, BrowserWindow } = require('electron');
const path = require('path');

// Creating a Window. NOTE: this only be created after the app module's ready event if fired.
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 400,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        // resizable: false
    });
    // win.removeMenu();
    win.loadFile(path.join(__dirname, "../build/index.html"));
}

// Loading Window
// whenReady wait for ready event is fired.
app.whenReady().then(() => {
    createWindow();
})

// ipcMain.on('GetforecastJSON', async(event) => {
//     const Weather = require(__dirname + '../src/weather.js');
//     const weather = new Weather();

//     event.sender.send('forecastJSON', await weather.forecastJSON());
// })
