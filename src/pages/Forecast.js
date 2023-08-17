import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import '../css/forecast.css';
import '../API/weather';
import ArrowRight, {ArrowLeft} from './Arrow';

export default function Forecast({ weatherdata }) {
    const location = useLocation();

    return(
        <>
            <Link to={'/'}>
                <ArrowLeft/>
            </Link>
        </>
    )
}
