const { ipcRenderer } = require('electron'); 
// ipcRenderer is used on renderer file and ipcMain used on main.js file.

class Printer{
    constructor(){
        this.forecastJSON = undefined;
    }
    
    async printData(){
        ipcRenderer.send('GetforecastJSON'); // calling GetforecastJSON on main.js

        ipcRenderer.on('forecastJSON', (event, forecastJSON) => {
            document.getElementById('location').innerHTML = `${forecastJSON.location.name}, ${forecastJSON.location.region}`;
        });
    }
}

const printer = new Printer();
printer.printData();
