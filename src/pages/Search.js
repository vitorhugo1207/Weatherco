import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import "../css/Search.css";
import { Weather } from "../API/weather";

// todo Make a style to Search box
// todo Make a autocomplite (https://react.dev/reference/react-dom/components/input)
// todo Make a button arrow style
// todo Make a enter press key event

const Selection = ({ cityResp }) => {
    const [citiesElements, setCitiesElements] = useState([]);
    
    function setSelection(){
        const newOption = [];

        for(let x = 0; x < cityResp.length; x++){
            newOption.push(React.createElement("option", {value:`${cityResp[x]?.name}, ${cityResp[x]?.region}`}, `${cityResp[x]?.name}, ${cityResp[x]?.region}`));
        }
        setCitiesElements(newOption);
    }

    useEffect(() => {
        setSelection();
    }, [cityResp])
    
    return(
        <select name="citiesElementsSelector" onClick={}>
            {citiesElements}
        </select>
    )
}

const Search = () =>{
    const [cityResp, setCityResp] = useState('');
    const inputRefSelection = useRef(null);

    async function getCityResp(e){
        const weather = new Weather(e.target.value);
        const response = await weather.getCity();
        setCityResp(response);
    }

    return(
        <div>
            <Link to='/'>Home</Link>

            <label>
                <input
                    onChange={(e) => {
                        setTimeout(() => getCityResp(e), 1000);
                    }}
                    autoFocus={true}
                />
                <Selection cityResp={cityResp}/>
            </label>
        </div>
    )
}

export default Search;
