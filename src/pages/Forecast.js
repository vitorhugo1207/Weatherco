import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/forecast.css';
import '../API/weather';
import { ArrowLeft } from './Arrow';

export default function Forecast() {
	const location = useLocation();
	const [weatherdata, setWeatherdata] = useState(location?.state?.data);
	const [cards, setCards] = useState([]);

	function card() {
		setCards([]);
		let newCards = [];

		const forecasts = weatherdata?.forecast?.forecastday;

		for (const forecast of forecasts) {
			const newCard = (
				<div className="card">
					<h1>
						{JSON.stringify(forecast?.date).slice(6).replace('-', '/').replace('"', '')}
					</h1>
				</div>
			);
			newCards.push(newCard);
		}
		setCards(newCards);
	}

	useEffect(() => {
		card();
	}, []);

	return (
		<>
			<div className='Cards'>{cards}</div>
			<Link to={'/'}>
				<ArrowLeft />
			</Link>
		</>
	);
}
