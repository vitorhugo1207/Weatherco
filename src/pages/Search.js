import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import "../css/Search.css";
import { Weather } from "../API/weather";

const Search = () =>{
    const [city, setCity] = useState('');
    const [citySearch, setCitySearch] = useState('');

    async function getCity(){
        const weather = new Weather(city);
        const response = await weather.getCity();
        setCity(response);
    }

    // function submit(e){
    //     e.preventDefault();

    //     const form = e.target;
    //     const formData = new FormData(form);

    //     const formJson = Object.fromEntries(formData.entries());

    //     console.log(formJson.myInput);
    // }

    return(
        <div>
            <Link to='/'>Home</Link>

            <label>
                <input
                    value={citySearch}
                    onChange={e => setCitySearch(e.target.value)}
                    autoFocus={true}
                />
            </label>
        </div>
    )
}

export default Search;
