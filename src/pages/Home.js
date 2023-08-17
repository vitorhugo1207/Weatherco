import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import { Weather } from '../API/weather';
import { Link, useLocation } from 'react-router-dom';
import ArrowRight from './Arrow';

function Location({ weatherData }) {
	const [changeLocationPopup, setChangeLocationPopup] = useState(false);

	return (
		<div className='locationDiv'>
			<Link to={'/search'} className='linkChangeLocation'>
				<p
					className='location'
					onMouseEnter={() => setChangeLocationPopup(true)}
					onMouseLeave={() => setChangeLocationPopup(false)}>
					{weatherData?.location?.name} -{' '}
					{weatherData?.location?.region}
				</p>
			</Link>
			{changeLocationPopup && (
				<div className='popup-location'>
					<p
						style={{
							margin: '16px',
							backgroundColor: '#555',
							fontSize: '16px',
						}}>
						Click to change location
					</p>
				</div>
			)}
		</div>
	);
}

function Temperature({ weatherData, loading }) {
	const [temp, setTemp] = useState('');
	const [feelsLike, setFeelsLike] = useState('');
	const [typeTemp, setTypeTemp] = useState('C');

	function switchTypeTemp() {
		if (typeTemp === 'C') {
			setTemp(weatherData?.current?.temp_f + '°F'); // this "?" serve to return undefined if has nothing
			setFeelsLike(weatherData?.current?.feelslike_f + '°F');
			setTypeTemp('F');
		} else {
			setTemp(weatherData?.current?.temp_c + '°C');
			setFeelsLike(weatherData?.current?.feelslike_c + '°C');
			setTypeTemp('C');
		}
	}

	async function initDatas() {
		if (typeTemp === 'C') {
			setTemp(weatherData?.current?.temp_c + '°C');
			setFeelsLike(weatherData?.current?.feelslike_c + '°C');
		} else {
			setTemp(weatherData?.current?.temp_f + '°F');
			setFeelsLike(weatherData?.current?.feelslike_f + '°F');
		}
	}

	useEffect(() => {
		if (!loading) {
			// semaphore to run initDatas() after getWeather receve API response
			initDatas();
		}
	}, [loading]); // if I have to use some external object in useEffect use dependence of useEffect

	return (
		<div className='Temperature'>
			<p className='temp' onClick={switchTypeTemp}>
				{temp}
			</p>
			<p className='feelslike' onClick={switchTypeTemp}>
				Feels Like: {feelsLike}
			</p>
		</div>
	);
}

function AirQuality({ weatherData, loading }) {
	const [airQuality, setAirQuality] = useState('');
	const [typeAirQuality, setTypeAirQuality] = useState('US_EPA');
	const [showSubAirType, setShowSubAirType] = useState(false);
	const [subAirTypes, setSubAirTypes] = useState('');

	function initDatas() {
		if (typeAirQuality === 'US_EPA') {
			setAirQuality(weatherData?.current?.air_quality['us-epa-index']);
			setSubAirTypes(
				<ul className='ListAirQuality'>
					<li className='ListAirQuality'>1 means Good</li>
					<li className='ListAirQuality'>2 means Moderate</li>
					<li className='ListAirQuality'>
						3 means Unhealthy for sensitive group
					</li>
					<li className='ListAirQuality'>4 means Unhealthy</li>
					<li className='ListAirQuality'>5 means Very Unhealthy</li>
					<li className='ListAirQuality'>6 means Hazardous</li>
				</ul>
			);
		} else {
			setAirQuality(weatherData?.current?.air_quality['gb-defra-index']);
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
	}

	function statusAirColor() {
		if (weatherData?.current?.air_quality['us-epa-index'] === 1) {
			return 'green';
		}
		if (weatherData?.current?.air_quality['us-epa-index'] === 2) {
			return 'yellow';
		}
		if (weatherData?.current?.air_quality['us-epa-index'] === 3) {
			return 'orange';
		}
		if (weatherData?.current?.air_quality['us-epa-index'] >= 4) {
			return 'red';
		}
	}

	function switchAirType() {
		if (typeAirQuality === 'US_EPA') {
			setAirQuality(weatherData?.current?.air_quality['gb-defra-index']);
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
			setTypeAirQuality('UK_DEGRA');
		} else {
			setAirQuality(weatherData?.current?.air_quality['us-epa-index']);
			setSubAirTypes(
				<ul className='ListAirQuality'>
					<li className='ListAirQuality'>1 means Good</li>
					<li className='ListAirQuality'>2 means Moderate</li>
					<li className='ListAirQuality'>
						3 means Unhealthy for sensitive group
					</li>
					<li className='ListAirQuality'>4 means Unhealthy</li>
					<li className='ListAirQuality'>5 means Very Unhealthy</li>
					<li className='ListAirQuality'>6 means Hazardous</li>
				</ul>
			);
			setTypeAirQuality('US_EPA');
		}
	}

	useEffect(() => {
		if (!loading) {
			// semaphore to run initDatas() after getWeather receve API response
			initDatas();
		}
	}, [loading]); // if I have to use some external object in useEffect use dependence of useEffect

	return (
		<div
			className='airQuality'
			onMouseEnter={() => setShowSubAirType(true)}
			onMouseLeave={() => setShowSubAirType(false)}
			onClick={switchAirType}>
			<p>Air Quality</p>
			<div className='statusAirDiv'>
				<div
					className='statusAirIcon'
					style={{ backgroundColor: statusAirColor() }}></div>
				<p style={{ margin: 0, marginLeft: '10px' }}>{airQuality}</p>
				{showSubAirType && (
					<div className='popup-AirQuality'>
						<div style={{ marginRight: '10px' }}>{subAirTypes}</div>
					</div>
				)}
			</div>
		</div>
	);
}

function Wind({ weatherData, loading }) {
	const [windSpeed, setWindSpeed] = useState('');
	const [windSpeedType, setWindSpeedType] = useState('kph');

	function initDatas() {
		if (windSpeedType === 'kph') {
			setWindSpeed(weatherData?.current?.wind_kph + ' khp');
		} else {
			setWindSpeed(weatherData?.current?.wind_mph + ' mph');
		}
	}

	function switchWindSpeed() {
		if (windSpeedType == 'kph') {
			setWindSpeed(weatherData?.current?.wind_mph + ' mph');
			setWindSpeedType('mph');
		} else {
			setWindSpeed(weatherData?.current?.wind_kph + ' kph');
			setWindSpeedType('kph');
		}
	}

	useEffect(() => {
		if (!loading) {
			// semaphore to run initDatas() after getWeather receve API response
			initDatas();
		}
	}, [loading]); // if I have to use some external object in useEffect use dependence of useEffect

	return (
		<div className='wind' onClick={switchWindSpeed}>
			<p>Wind</p>
			<p>{windSpeed}</p>
		</div>
	);
}

function Visibility({ weatherData, loading }) {
	const [visibility, setVisibility] = useState('');
	const [typeVisibility, setTypeVisibility] = useState('km');

	function initDatas() {
		if (typeVisibility === 'km') {
			setVisibility(weatherData?.current?.vis_km + ' km');
		} else {
			setVisibility(weatherData?.current?.vis_miles + ' miles');
		}
	}

	function switchVisibility() {
		if (typeVisibility == 'km') {
			setVisibility(weatherData?.current?.vis_miles + ' miles');
			setTypeVisibility('miles');
		} else {
			setVisibility(weatherData?.current?.vis_km + ' km');
			setTypeVisibility('km');
		}
	}

	useEffect(() => {
		if (!loading) {
			// semaphore to run initDatas() after getWeather receve API response
			initDatas();
		}
	}, [loading]); // if I have to use some external object in useEffect use dependence of useEffect

	return (
		<div className='visibility' onClick={switchVisibility}>
			<p>Visibility</p>
			<p>{visibility}</p>
		</div>
	);
}

function Precipitation({ weatherData, loading }) {
	const [precipitation, setPrecipitation] = useState('');
	const [typePrecipitation, setTypePrecipitation] = useState('mm');

	async function initDatas() {
		if (typePrecipitation === 'mm') {
			setPrecipitation(weatherData?.current?.precip_mm + ' mm');
		} else {
			setPrecipitation(weatherData?.current?.precip_in + ' in');
		}
	}

	function switchPrecipitation() {
		if (typePrecipitation == 'mm') {
			setPrecipitation(weatherData?.current?.precip_in + ' in');
			setTypePrecipitation('in');
		} else {
			setPrecipitation(weatherData?.current?.precip_mm + ' mm');
			setTypePrecipitation('mm');
		}
	}

	useEffect(() => {
		if (!loading) {
			// semaphore to run initDatas() after getWeather receve API response
			initDatas();
		}
	}, [loading]); // if I have to use some external object in useEffect use dependence of useEffect

	return (
		<div className='precipitation' onClick={switchPrecipitation}>
			<p>Precipitation</p>
			<p>{precipitation}</p>
		</div>
	);
}

function Humidity({ weatherData }) {
	return (
		<div className='humidity'>
			<p>Humidity</p>
			<p>{weatherData?.current?.humidity}%</p>
		</div>
	);
}

function WindDirection({ weatherData }) {
	return (
		<div className='windDirection'>
			<p>Wind Direction</p>
			<p>{weatherData?.current?.wind_dir}</p>
		</div>
	);
}

export default function Home() {
	const location = useLocation();
	const [weatherData, setWeatherData] = useState('');
	const [loading, setLoading] = useState(true); // semaphore to run initDatas() after getWeather receve API response
	const [city, setCity] = useState(
		location.state?.cityFromSearch == undefined
			? 'getulina'
			: location.state?.cityFromSearch
	); // 'getulina' will be removed when api geolocalizaton is implemented

	async function getWeather() {
		const weather = new Weather(city);
		const response = await weather.forecastJSON();
		setWeatherData(response);
		setLoading(false);
	}

	useEffect(() => {
		// useEffect avoid repeat several times
		getWeather();
	}, []);

	return (
		<>
			<div className='head'>
				<Location weatherData={weatherData} />
				<Temperature weatherData={weatherData} loading={loading} />
			</div>

			<Link to={'/forecast'} state={{data: weatherData}}>
				<ArrowRight />
			</Link>

			<div className='detail'>
				<AirQuality weatherData={weatherData} loading={loading} />
				<Wind weatherData={weatherData} loading={loading} />
				<WindDirection weatherData={weatherData} />
				<Humidity weatherData={weatherData} />
				<Precipitation weatherData={weatherData} loading={loading} />
				<Visibility weatherData={weatherData} loading={loading} />
			</div>
		</>
	);
}
