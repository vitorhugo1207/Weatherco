import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/forecast.css';
import '../API/weather';
import { ArrowLeft } from './Arrow';

export default function Forecast() {
	const location = useLocation();

	const [weatherdata, setWeatherdata] = useState(location.state.data);
	const [cards, setCards] = useState([]);
	const [temp, setTemp] = useState('');
	const [tempType, setTempType] = useState("C");
	const [tempForecast, setTempForecast] = useState("C");

	function card(forecast) {
		const newCard = (
			<div className="card">
				<h1 className='cardTitle'>
					{JSON.stringify(forecast.date).slice(6).replace('-', ' / ').replace('"', '')}
				</h1>
				<p>{temp}</p>
			</div>
		);

		return newCard;
	}

	function initTemp(forecast) {
		let oldTemp;
		tempType == "F"
			? oldTemp = `${JSON.stringify(forecast.day.avgtemp_f)}°F`
			: oldTemp = `${JSON.stringify(forecast.day.avgtemp_c)}°C`
		setTemp(oldTemp);
	}

	useEffect(() => {
		setCards([]);
		let newCards = [];
		let newCard;

		const forecasts = weatherdata.forecast.forecastday;
		for (const forecast of forecasts) {
			// setTempForecast(forecast);
			newCards.push(card(forecast));
			initTemp(forecast);
		}
		setCards(newCards);
	}, []);

	return (
		<>
			<div className='cards'>{cards}</div>
			<Link to={'/'}>
				<ArrowLeft />
			</Link>
		</>
	);
}
