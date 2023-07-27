import React from 'react';
import {Link} from 'react-router-dom'
import "./Search.css";
import { Weather } from "./weather";

const Search = () =>{
    return(
        <div>
            <p>This is Search page!!!</p>
            <Link to='/'>Home</Link>
        </div>
    )
}

export default Search;
