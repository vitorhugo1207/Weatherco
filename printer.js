class Printer{
    constructor(forecastJSON, document){
        this.forecastJSON = forecastJSON;
        this.document = document;
    }

    printData(){
        document.getElementById("location").innerHTML = "funfou, FINALMENTEEEEEEEEEEEEEE!!!!!!!!!!!!";
        this.document.getElementById("location").innerHTML = `${this.forecastJSON.location.name}, ${this.forecastJSON.location.region}`
    }
}
Printer.printData();
// async function LoadFunction(){
//     var Weather = require(__dirname + '/weather.js');
//     var weather = new Weather(); // Instanciar funções contruidoras
    
//     let forecastJSON = await weather.forecastJSON();

//     var Printer = require(__dirname + "/printer.js"); 
//     var printer = new Printer(forecastJSON); // If want to pass a value retorn from another function.
    
//     printer.printData();
// }
// await LoadFunction();
