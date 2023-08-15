import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Search.css';
import { Weather } from '../API/weather';
import Select from 'react-select';

const Search = () => {
	const [search, setSearch] = useState([]);
	const [input, setInput] = useState('');
	const navegate = useNavigate();

	const getCityResp = (inputValue) => {
		setInput(input);
		const weather = new Weather(inputValue);
		const response = weather.getCity();
		response.then((response) => {
			const newOption = [];
			for (let x = 0; x < response.length; x++) {
				newOption.push({
					value: `${response[x]?.name}-${response[x]?.region}`,
					label: `${response[x]?.name}, ${response[x]?.region}`,
				});
			}
			setSearch(newOption);
		});
	};

	const navegateToHome = (inputValue) => {
		const value = inputValue.value;
		navegate('/', { state: { cityFromSearch: value } });
	};

	return (
		<div>
			<Link to='/'>
				<div className='x' />
			</Link>

			<div class='ReactSelector'>
				<Select
					spellcheck
					placeholder='Type the name city'
					options={search}
					onInputChange={getCityResp}
					autoFocus={true}
					onChange={navegateToHome}
					classNamePrefix='react-select'
				/>
			</div>
		</div>
	);
};

export default Search;
