import React, {useState, useEffect} from 'react';
import './App.css';
import {Weather} from './weather';

// https://www.mongodb.com/docs/realm/sdk/node/integrations/electron-cra/

// npm start
// cls && npm run build && copy APIKEY.json build

// ! Chamando a função getWeather() infinitamente

function App() {
    const [weatherData, setWeatherData] = useState('');
    const [temp, setTemp] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [typeTemp, setTypeTemp] = useState("C");
    const [loading, setLoading] = useState(true); // semaphore to run initTemp() after getWeather receve API response

    async function getWeather(){
        let weather = new Weather();
        const response = await weather.forecastJSON();
        setWeatherData(response);
        setLoading(false); // semaphore to run initTemp() after getWeather receve API response
    }

    function switchTypeTemp(){
        if(typeTemp === "C"){
            setTemp(weatherData?.current?.temp_f + "°F"); // this "?" serve to return undefined if has nothing
            setFeelsLike(weatherData?.current?.feelslike_f + "°F");
            setTypeTemp("F");
        }
        else{
            setTemp(weatherData?.current?.temp_c + "°C");
            setFeelsLike(weatherData?.current?.feelslike_c + "°C");
            setTypeTemp("C");
        }
    }
    
    async function initTemp(){
        if(typeTemp === "C"){
            setTemp(weatherData?.current?.temp_c + "°C");
            setFeelsLike(weatherData?.current?.feelslike_c + "°C");
        }
        else{
            setTemp(weatherData?.current?.temp_f + "°F");
            setFeelsLike(weatherData?.current?.feelslike_f + "°F");
        }
    }

    useEffect(() => {
        getWeather();
    }, [])

    // Calling initial functions
    useEffect(() => { // useEffect avoid repeat several times
        if(!loading){ // semaphore to run initTemp() after getWeather receve API response
            initTemp();
        }
    }, [loading]); // if I have to use some external object in useEffect use dependence of useEffect
    
    return (
    <div className='main'>
        <div className='head'>
            <p>{weatherData?.location?.name} - {weatherData?.location?.region}</p>
            <p className='temp' onClick={switchTypeTemp}>{temp}</p>
            <p className='feelslike' onClick={switchTypeTemp}>Feels Like: {feelsLike}</p>
        </div>
        <div className='detail'>
            <div className='airQuality'>
                <p className='statusAir'></p>
                <p>Air Quality</p>
                <p>{weatherData?.current?.air_quality["us-epa-index"]}</p>
            </div>
        </div>
    </div>
    );
}

export default App;
