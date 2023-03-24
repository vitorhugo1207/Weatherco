module.exports = class getWeather{
    constructor(){
        this.url = "http://api.weatherapi.com/v1/current.json?";
        this.apikey = undefined;
    }
       
    async getApiKey(){
        const fs = require('fs')
        const path = require('path')
        this.apikey = fs.readFileSync(__dirname + '/APIKEY.json', 'utf-8', (err, data) => {
            if (err){
                console.error(err);
                return;
            }
            this.apikey = data;
        })
        this.apikey = JSON.parse(this.apikey); // transform reponse in a json object
        this.apikey = this.apikey.key
    }

    async requestWeather(){
        console.log("test")
    }
}
