import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import "../css/Search.css";
import { Weather } from "../API/weather";

const Search = () =>{
    const [city, setCity] = useState('');

    async function getCity(){
        const weather = new Weather(city);
        const response = await weather.getCity();
        setCity(response);
    }

    function submit(e){
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        console.log(formJson.myInput);
    }

    return(
        <div>
            <Link to='/'>Home</Link>

            <form method='post' onSubmit={submit}>
                <label>
                    <input name='myInput' />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Search;
