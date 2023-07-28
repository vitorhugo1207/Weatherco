import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import "../css/Search.css";
import { Weather } from "../API/weather";

const Search = () =>{
    const [cityResp, setCityResp] = useState('');
    const [citiesElements, setCitiesElements] = useState('');

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    async function setSelection(){
        for(let x = 0; x < cityResp.length; x++){
            const newOption = React.createElement("option", {value:`${cityResp[x]?.name}, ${cityResp[x]?.region}`}, `${cityResp[x]?.name}, ${cityResp[x]?.region}`);
            // setCitiesElements(citiesElements.concat(newOption));
            // return newOption;
        }
    }

    async function getCityResp(e){
        // await delay(1000);
        const weather = new Weather(e.target.value);
        const response = await weather.getCity();
        setCityResp(response);
        await setSelection();
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
                    onChange={e => getCityResp(e)}
                    autoFocus={true}
                />
                <select name="citiesElementsSelector">
                    {citiesElements}
                </select>
            </label>
        </div>
    )
}

export default Search;
