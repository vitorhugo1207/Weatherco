import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/forecast.css';
import '../API/weather';
import { ArrowLeft } from './Arrow';

export default function Forecast() {
	const location = useLocation();

	const [weatherdata, setWeatherdata] = useState(location?.state?.data);
	const [cards, setCards] = useState([]);
	const [temp, setTemp] = useState('');
	const [tempType, setTempType] = useState("C");
	const [tempForecast, setTempForecast] = useState("C");

	async function card() {
		setCards([]);
		let newCards = [];

		const forecasts = weatherdata?.forecast?.forecastday;

		for (const forecast of forecasts) {
			setTempForecast(forecast);

			const newCard = (
				<div className="card">
					<h1 className='cardTitle'>
						{JSON.stringify(forecast.date).slice(6).replace('-', ' / ').replace('"', '')}
					</h1>
					{(() => {
						let oldTemp;
						tempType == "F"
							? oldTemp = `${JSON.stringify(forecastfsafsfas?.day?.avgtemp_f)}°F`
							: oldTemp = `${JSON.stringify(forecasdfasfdsafdst?.day?.avgtemp_c)}°C`
						
						setTemp(oldTemp);

						// if (tempType == "F") {
						// 	setTemp(`${JSON.stringify(forecast?.day?.avgtemp_f)}°F`);
						// } else {
						// 	setTemp(`${JSON.stringify(forecast?.day?.avgtemp_c)}°C`);
						// }
					
						return <p onClick={changeTempType}>{temp}</p>;
					})()}
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
