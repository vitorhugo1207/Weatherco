const { app, BrowserWindow } = require('electron')

// Creating a Window. NOTE: this only be created after the app module's ready event if fired.
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true
    })
    win.loadFile("index.html")
}

async function LoadFunction(){
    var Weather = require(__dirname + '/weather.js');
    var weather = new Weather(); // Instanciar funções contruidoras
    console.log(await weather.requestWeather())
}
LoadFunction();

// Loading Window
// whenReady wait for ready event is fired.
app.whenReady().then(() => {
    createWindow();
})
