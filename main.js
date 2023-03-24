const { app, BrowserWindow } = require('electron')

// Creating a Window. NOTE: this only be created after the app module's ready event if fired.
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height:600,
        autoHideMenuBar: true
    })
    win.loadFile("index.html")
}

function loadFunctions(){
    var test = require('./GetWeather.js');
    const Test = new test(); // Instanciar funções contruidoras
    console.log(Test.getApiKey())
}

// Loading Window
// whenReady wait for ready event is fired.
app.whenReady().then(() => {
    createWindow();
    loadFunctions()
})
