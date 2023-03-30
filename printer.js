const { ipcRenderer } = require('electron'); 
// ipcRenderer is used on renderer file and ipcMain used on main.js file.

class Printer{
    constructor(){}
    
    async printData(){
        ipcRenderer.send('GetforecastJSON'); // calling GetforecastJSON on main.js

        ipcRenderer.on('forecastJSON', (event, forecastJSON) => {
            document.querySelector('.location').innerHTML = `${forecastJSON.location.name}, ${forecastJSON.location.region}`;

            // document.querySelector('#bg-img').src = "./imgs/bg/rain.gif";

            document.querySelector('.temp_c').innerHTML = `${forecastJSON.current.temp_c}`;
            
            document.querySelector('.temp_f').innerHTML = `${forecastJSON.current.temp_f}`;
        });
    }
}

const printer = new Printer();
printer.printData();
