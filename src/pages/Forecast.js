import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/forecast.css';
import '../API/weather';
import { ArrowLeft } from './Arrow';

export default function Forecast() {
	const location = useLocation();
	const [weatherdata, setWeatherdata] = useState(location?.state?.data);
	const [cards, setCards] = useState([]);
	const [temp, setTemp] = useState("");
	const [tempType, setTempType] = useState("C");
	const [tempForecast, setTempForecast] = useState("C");

	function card() {
		setCards([]);
		let newCards = [];

		const forecasts = weatherdata?.forecast?.forecastday;

		for (const forecast of forecasts) {
			setTempForecast(forecast);
			initTemp();

			const newCard = (
				<div className="card">
					<h1 className='cardTitle'>
						{JSON.stringify(forecast?.date).slice(6).replace('-', ' / ').replace('"', '')}
					</h1>
					<p onClick={changeTempType}>{() => {
						if (tempType == "F") {
							setTempType("F");
							console.log("aaa")
							return `${JSON.stringify(tempForecast?.day?.avgtemp_f)}°F`;
						} else {
							console.log("aaa")
							setTempType("C");
							return (`${JSON.stringify(tempForecast?.day?.avgtemp_c)}°C`);
						}
					}}</p>
				</div>
			);
			newCards.push(newCard);
		}
		setCards(newCards);
	}

	function changeTempType() {
		if (tempType == "C") {
			setTempType("F");
			setTemp(`${JSON.stringify(tempForecast?.day?.avgtemp_f)}°F`);
		} else {
			setTempType("C");
			setTemp(`${JSON.stringify(tempForecast?.day?.avgtemp_c)}°C`);
		}
	}

	function initTemp() {
		if (tempType == "F") {
			setTempType("F");
			return `${JSON.stringify(tempForecast?.day?.avgtemp_f)}°F`;
		} else {
			setTempType("C");
			return (`${JSON.stringify(tempForecast?.day?.avgtemp_c)}°C`);
		}
	}

	useEffect(() => {
		card();
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
