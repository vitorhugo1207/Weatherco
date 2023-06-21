import React, {Component, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Weather} from './weather';

// npm start
// cls && npm run build && copy APIKEY.json build

function App() {
    const [weatherData, setWeatherData] = useState('');

    async function getWeather(){
        let weather = new Weather();
        const response = await weather.forecastJSON();
        setWeatherData(response);
    }

    useEffect(() => {
        getWeather();
    }, [])

    return (
    <div className=''>
        <p>{weatherData?.location?.name}-{weatherData?.location?.region}</p>
    </div>
    );
}

export default App;
