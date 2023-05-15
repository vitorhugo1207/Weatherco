import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Weather} from './weather';

class App extends Component{
    async getWeather(){
        const weather = new Weather();
        return await weather.forecastJSON();
    }
    
    render(props) {    
        return (
            <div>
                <h1>{this.getWeather()}</h1>
            </div>
        );
    }
}

export default App;
