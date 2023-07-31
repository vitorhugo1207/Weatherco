import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import {Weather} from '../API/weather';
import { Link } from "react-router-dom";

// !!! Restruture this page
// !!! Restruture this page
// !!! Restruture this page

function Home() {
    const [weatherData, setWeatherData] = useState('');
    const [loading, setLoading] = useState(true); // semaphore to run initDatas() after getWeather receve API response
    
    const [city, setCity] = useState("getulina");
    const [changeLocationPopup, setChangeLocationPopup] = useState(false);

    const [temp, setTemp] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [typeTemp, setTypeTemp] = useState("C");

    const [airQuality, setAirQuality] = useState('');
    const [typeAirQuality, setTypeAirQuality] = useState("US_EPA");
    const [showSubAirType, setShowSubAirType] = useState(false);
    const [subAirTypes, setSubAirTypes] = useState('');

    const [windSpeed, setWindSpeed] = useState('');
    const [windSpeedType, setWindSpeedType] = useState('kph'); 

    const[visibility, setVisibility] = useState('');
    const[typeVisibility, setTypeVisibility] = useState('km');

    const[precipitation, setPrecipitation] = useState('');
    const[typePrecipitation, setTypePrecipitation] = useState('mm');

    async function getWeather(){
        const weather = new Weather(city);
        const response = await weather.forecastJSON();
        setWeatherData(response);
        setLoading(false); // semaphore to run initDatas() after getWeather receve API response
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
    
    async function initDatas(){
        // Temp
        if(typeTemp === "C"){
            setTemp(weatherData?.current?.temp_c + "°C");
            setFeelsLike(weatherData?.current?.feelslike_c + "°C");
        }else{
            setTemp(weatherData?.current?.temp_f + "°F");
            setFeelsLike(weatherData?.current?.feelslike_f + "°F");
        }

        // Air Quality
        if(typeAirQuality === "US_EPA"){
            setAirQuality(weatherData?.current?.air_quality["us-epa-index"]);
            setSubAirTypes(
            <ul className='ListAirQuality'>
                <li className='ListAirQuality'>1 means Good</li>
                <li className='ListAirQuality'>2 means Moderate</li>
                <li className='ListAirQuality'>3 means Unhealthy for sensitive group</li>
                <li className='ListAirQuality'>4 means Unhealthy</li>
                <li className='ListAirQuality'>5 means Very Unhealthy</li>
                <li className='ListAirQuality'>6 means Hazardous</li>
            </ul>
        );
        }else{
            setAirQuality(weatherData?.current?.air_quality["gb-defra-index"]);
            setSubAirTypes(
                <ul className='ListAirQuality'>
                    <li className='ListAirQuality'>1 - Low</li>
                    <li className='ListAirQuality'>2 - Low</li>
                    <li className='ListAirQuality'>3 - Low</li>
                    <li className='ListAirQuality'>4 - Moderate</li>
                    <li className='ListAirQuality'>5 - Moderate</li>
                    <li className='ListAirQuality'>6 - Moderate</li>
                    <li className='ListAirQuality'>7 - High</li>
                    <li className='ListAirQuality'>8 - High</li>
                    <li className='ListAirQuality'>9 - High</li>
                    <li className='ListAirQuality'>10 - Very High</li>
                </ul>
            );
        }

        // Wind
        if(windSpeedType === "kph"){
            setWindSpeed(weatherData?.current?.wind_kph + " khp");
        }else{
            setWindSpeed(weatherData?.current?.wind_mph + " mph");
        }

        // Visibility
        if(typeVisibility === "km"){
            setVisibility(weatherData?.current?.vis_km + " km");
        }else{
            setVisibility(weatherData?.current?.vis_miles + " miles");
        }

        // Precipitation
        if(typePrecipitation === "mm"){
            setPrecipitation(weatherData?.current?.precip_mm + " mm");
        }else{
            setPrecipitation(weatherData?.current?.precip_in + " in");
        }
    }

    function statusAirColor(){
        if(weatherData?.current?.air_quality["us-epa-index"] === 1){
            return 'green'
        }
        if(weatherData?.current?.air_quality["us-epa-index"] === 2){
            return 'yellow'
        }
        if(weatherData?.current?.air_quality["us-epa-index"] === 3){
            return 'orange'
        }
        if(weatherData?.current?.air_quality["us-epa-index"] >= 4){
            return 'red'
        }
    }

    function switchAirType(){
        if(typeAirQuality === "US_EPA"){
            setAirQuality(weatherData?.current?.air_quality["gb-defra-index"]);
            setSubAirTypes(
                <ul className='ListAirQuality'>
                    <li className='ListAirQuality'>1 - Low</li>
                    <li className='ListAirQuality'>2 - Low</li>
                    <li className='ListAirQuality'>3 - Low</li>
                    <li className='ListAirQuality'>4 - Moderate</li>
                    <li className='ListAirQuality'>5 - Moderate</li>
                    <li className='ListAirQuality'>6 - Moderate</li>
                    <li className='ListAirQuality'>7 - High</li>
                    <li className='ListAirQuality'>8 - High</li>
                    <li className='ListAirQuality'>9 - High</li>
                    <li className='ListAirQuality'>10 - Very High</li>
                </ul>
            );
            setTypeAirQuality("UK_DEGRA");
        }
        else{
            setAirQuality(weatherData?.current?.air_quality["us-epa-index"]);
            setSubAirTypes(
                <ul className='ListAirQuality'>
                    <li className='ListAirQuality'>1 means Good</li>
                    <li className='ListAirQuality'>2 means Moderate</li>
                    <li className='ListAirQuality'>3 means Unhealthy for sensitive group</li>
                    <li className='ListAirQuality'>4 means Unhealthy</li>
                    <li className='ListAirQuality'>5 means Very Unhealthy</li>
                    <li className='ListAirQuality'>6 means Hazardous</li>
                </ul>
            );
            setTypeAirQuality("US_EPA");
        }
    }

    function switchWindSpeed(){
        if(windSpeedType == "kph"){
            setWindSpeed(weatherData?.current?.wind_mph + " mph");
            setWindSpeedType("mph");
        }else{
            setWindSpeed(weatherData?.current?.wind_kph + " kph");
            setWindSpeedType("kph");
        }
    }

    function switchVisibility(){
        if(typeVisibility == "km"){
            setVisibility(weatherData?.current?.vis_miles + " miles");
            setTypeVisibility("miles");
        }else{
            setVisibility(weatherData?.current?.vis_km + " km");
            setTypeVisibility("km");
        }
    }

    function switchPrecipitation(){
        if(typePrecipitation == "mm"){
            setPrecipitation(weatherData?.current?.precip_in + " in");
            setTypePrecipitation("in");
        }else{
            setPrecipitation(weatherData?.current?.precip_mm + " mm");
            setTypePrecipitation("mm");
        }
    }

    // Calling initial functions
    useEffect(() => { // useEffect avoid repeat several times
        getWeather();
    }, [])

    useEffect(() => { 
        if(!loading){ // semaphore to run initDatas() after getWeather receve API response
            initDatas();
        }
    }, [loading]); // if I have to use some external object in useEffect use dependence of useEffect
    
    // as can see in popup airType when set some variable use arrow function to avoid error
    return (
        <div className='main'>
            <div className='head'>
                <Link to={"/search"} className='linkChangeLocation'><p className='location' onMouseEnter={() => setChangeLocationPopup(true)} onMouseLeave={() => setChangeLocationPopup(false)}>{weatherData?.location?.name} - {weatherData?.location?.region}</p></Link>
                {changeLocationPopup && (
                    <div className='popup-location'>
                        <p style={{margin: '16px', backgroundColor: '#555', fontSize: '16px'}}>Click to change location</p>
                    </div>
                )}
                
                <p className='temp' onClick={switchTypeTemp}>{temp}</p>
                <p className='feelslike' onClick={switchTypeTemp}>Feels Like: {feelsLike}</p>
            </div>
            <div className='detail'>
                <div className='airQuality'>
                    <p>Air Quality</p>
                    <div className='statusAirDiv' onMouseEnter={() => setShowSubAirType(true)} onMouseLeave={() => setShowSubAirType(false)}>
                        <div className='statusAirIcon' style={{backgroundColor: statusAirColor()}} onMouseEnter={() => setShowSubAirType(false)} onMouseLeave={() => setShowSubAirType(false)}></div>
                        <p style={{margin: 0, marginLeft: '10px'}} onClick={switchAirType}>{airQuality}</p>
                        {showSubAirType && (
                            <div className='popup-AirQuality'>
                                <div style={{marginRight: '10px'}}>
                                    {subAirTypes}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='wind'>
                    <p>Wind</p>
                    <p onClick={switchWindSpeed}>{windSpeed}</p>
                </div>

                <div className='windDirection'>
                    <p>Wind Direction</p>
                    <p>{weatherData?.current?.wind_dir}</p>
                </div>

                <div className='humidity'>
                    <p>Humidity</p>
                    <p>{weatherData?.current?.humidity}%</p>
                </div>

                <div className='visibility'>
                    <p>Visibility</p>
                    <p onClick={switchVisibility}>{visibility}</p>
                </div>
                
                <div className='precipitation'>
                    <p>Precipitation</p>
                    <p onClick={switchPrecipitation}>{precipitation}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
