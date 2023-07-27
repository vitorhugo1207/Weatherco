const { reject } = require('assert');
const { resolve } = require('path');

export class Weather{
    constructor(city){
        this.forecastURL = "https://api.weatherapi.com/v1/forecast.json?";
        this.cityURL = "https://api.weatherapi.com/v1/search.json?";
        this.apikey = this.getApiKey();
        this.city = city; // Forward it's call a function to get the geolocalization
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

    getCity(){
        return new Promise((resolve, reject) =>{
            const request = require('https');

            request.get(`${this.cityURL}key=${this.apikey}&q=${this.city}`, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                })

                resp.on('end', () => {
                    resolve(JSON.parse(data));
                })
            }).on("error", (err) => {
                reject(err);
            })
        })
    }

    forecastJSON(){
        return new Promise((resolve, reject) => { // callback function, resolve is a function will return my value, reject is a function will return error. This function is async then when for call it use async/await.
            const request = require('https');
            request.get(`${this.forecastURL}key=${this.apikey}&q=${this.city}&days=3&aqi=yes&alerts=yes`, (resp) => {
                let data = '';

                // Chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                })

                // The whole response has been received. Print out the result. 
                resp.on('end', () => {
                    resolve(JSON.parse(data));
                })
            }).on("error", (err) => {
                reject(err);
            });
        })
    }
}
