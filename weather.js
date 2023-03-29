const { reject } = require('assert');

module.exports = class Weather{
    constructor(){
        this.url = "https://api.weatherapi.com/v1/current.json?";
        this.apikey = this.getApiKey();
        this.city = 'getulina'; // Forward it's call a function to get the geolocalization
    }

    getApiKey(){
        const fs = require('fs')
        this.apikey = fs.readFileSync(__dirname + '/APIKEY.json', 'utf-8', (err, data) => {
            if (err){
                return;
            }
            this.apikey = data;
        })
        this.apikey = JSON.parse(this.apikey); // transform reponse in a json object
        return this.apikey = this.apikey.key;
    }

    forecastJSON(){
        return new Promise((resolve, reject) => { // callback function, resolve is a function will return my value, reject is a function will return error. This function is async then when for call it use async/await.
            const request = require('https');
            request.get(`${this.url}key=${this.apikey}&q=${this.city}&days=3&aqi=yes&alerts=yes`, (resp) => {
                let data = '';

                // Chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                })

                // The whole response has been received. Print out the result. 
                resp.on('end', () => {
                    resolve(JSON.parse(data));
                    // console.log(JSON.parse(data))
                })
            }).on("error", (err) => {
                reject(err);
            });
        })
    }
}
