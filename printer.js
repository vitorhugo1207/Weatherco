const { ipcRenderer } = require('electron'); 
// ipcRenderer is used on renderer file and ipcMain used on main.js file.

class Printer{
    constructor(){}
    
    async printData(){
        ipcRenderer.send('GetforecastJSON'); // calling GetforecastJSON on main.js

        ipcRenderer.on('forecastJSON', (event, forecastJSON) => {
            document.querySelector('.location').innerHTML = `${forecastJSON.location.name}, ${forecastJSON.location.region}`;

            // Patchy rain possible
            if(1063 == forecastJSON.current.condition.code){
                document.body.style.backgroundImage = "url(./imgs/bg/rain.gif)";
                document.body.style.backgroundAttachment = "fixed";
                document.body.style.backgroundSize = "100% 100%";
                document.body.style.backgroundRepeat = "no-repeat";
            };
        });
    }
}

const printer = new Printer();
printer.printData();
