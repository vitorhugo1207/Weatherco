module.exports = class getWeather{
    constructor(){
        this.url = "http://api.weatherapi.com/v1/current.json?";
        this.apikey
    }
       
    async getApiKey(){
        console.log("Estou sendo chamada!! yay");
        fetch("./APIKEY.json").then((response) => response.json()).then((json) => this.apikey);
        document.querySelector(".key") = this.apikey
    }

    requestWeather(){
        console.log("test")
    }
}
