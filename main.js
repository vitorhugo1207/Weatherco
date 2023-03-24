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

function LoadFunction(){
    var getWeather = require('./GetWeather.js');
    const GetWeather = new getWeather(); // Instanciar funções contruidoras
    console.log(GetWeather.requestWeather())
}
LoadFunction();

// Loading Window
// whenReady wait for ready event is fired.
app.whenReady().then(() => {
    createWindow();
})
