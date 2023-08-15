import React from 'react';
import { Link } from 'react-router-dom';
import '../css/forecast.css';
import '../API/weather';
import ArrowRight, {ArrowLeft} from './Arrow';

export default function Forecast({weatherdata}){
    return(
        <>
            <Link to={'/'}>
                <ArrowLeft/>
            </Link>
        </>
    )
}
