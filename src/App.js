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
    const [typeTemp, setTypeTemp] = useState("C");
    
    async function getWeather(){
        let weather = new Weather();
        const response = await weather.forecastJSON();
        setWeatherData(response);
    }
    
    function switchTypeTemp(){
        if(typeTemp === "C"){
            setTemp(weatherData?.current?.temp_f);
            setTypeTemp("F");
        }
        else{
            setTemp(weatherData?.current?.temp_c);
            setTypeTemp("C");
        }
    }

    function initTemp(){
        if(typeTemp === "C"){
            setTemp(weatherData?.current?.temp_c);
        }
        else{
            setTemp(weatherData?.current?.temp_f);
        }
    }

    useEffect(() => {
        getWeather();
        initTemp();
      }, [typeTemp, weatherData]);
    
    return (
    <div className='main'>
        <div className='head'>
            <p>{weatherData?.location?.name} - {weatherData?.location?.region}</p>
            <p className='temp' onClick={switchTypeTemp}>{temp}</p>
        </div>
    </div>
    );
}

export default App;
