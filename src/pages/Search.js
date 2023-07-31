import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import "../css/Search.css";
import { Weather } from "../API/weather";

const Selection = ({cityResp}) => {
    const [citiesElements, setCitiesElements] = useState([]);

    async function setSelection(){
        // setCitiesElements(citiesElements.fill(null));
        for(let y = 0; y < citiesElements.length; y++){
            // citiesElements.slice(y, 1);
            setCitiesElements(citiesElements.filter(citiesElements[y]))
        }

        for(let x = 0; x < cityResp.length; x++){
            let newOption = React.createElement("option", {value:`${cityResp[x]?.name}, ${cityResp[x]?.region}`}, `${cityResp[x]?.name}, ${cityResp[x]?.region}`);
            setCitiesElements([...citiesElements, newOption]); // array spread
        }

        console.log("-----------------------");
        console.log(cityResp);
        console.log(citiesElements);
        console.log("-----------------------");
    }

    useEffect(() => {
        setSelection();
    }, [cityResp])

    return(
        <select name="citiesElementsSelector">
            {citiesElements}
        </select>
    )
}

const Search = () =>{
    const [cityResp, setCityResp] = useState('');
    
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    async function getCityResp(e){
        // await delay(1000);
        const weather = new Weather(e.target.value);
        const response = await weather.getCity();
        setCityResp(response);
    }

    return(
        <div>
            <Link to='/'>Home</Link>

            <label>
                <input
                    onChange={e => getCityResp(e)}
                    autoFocus={true}
                />
                <Selection cityResp={cityResp}/>
            </label>
        </div>
    )
}

export default Search;
