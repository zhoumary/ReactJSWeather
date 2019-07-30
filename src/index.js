import React from 'react';
import ReactDOM from 'react-dom';
import weatherForecast from './weather';
import './index.css';
import Raining from './icons8-rain-cloud-50.png';


class LocationOverview extends React.Component {
    render() {
        return (
            <div id="overviewinfo">
                <div id="location">
                    <div>
                        {this.props.location}
                    </div>
                </div>
                <div id="overview">
                    <div>
                        {this.props.overview}
                    </div>
                </div>
                <div id="temperature">
                    <div>
                        {this.props.temperature}
                        <span class="tempUnit">&#8451;</span>
                    </div>
                </div> 
            </div>                      
        );
    }
}

class CurrentWeather extends React.Component {
    getWeekDay() {
        const day = new Date();
        const weeklyNum = day.getDay();
        var weekday = new Array(7);
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[4] = "Friday";
        weekday[6] = "Saturday";
        weekday[0] = "Sunday";
        return weekday[weeklyNum];
    }
    
    render() {
        return(
            <div id="todayWeather">
                <div id="date">
                    <table id="dateTemp">
                        <thead>
                            <th id="weekDay">
                                {this.getWeekDay()}                                
                            </th>
                            <th id="today">
                                <span>Today</span>
                            </th>
                            <th id="highTemp">
                                {this.props.highest}
                                <span class="tempUnit">&#8451;</span>
                            </th>
                            <th id="lowTemp">
                                {this.props.lowest}
                                <span class="tempUnit">&#8451;</span>   
                            </th>
                        </thead>
                    </table>                   
                </div>
                <div class="currWeatherLine">
                    <hr></hr>
                </div>
                <div id="timeWeather">
                    <table id="weatherDetails">
                        <tbody>
                            <tr id="time">
                                <td class="timeStyle">Now</td>
                                <td class="timeStyle">6PM</td>
                                <td class="timeStyle">7PM</td>
                                <td class="timeStyle">8PM</td>
                                <td class="timeStyle">9PM</td>
                            </tr>
                            <tr id="weatherSymbol">
                                <td class="timeStyle"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                                <td class="timeStyle"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                                <td class="timeStyle"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                                <td class="timeStyle"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                                <td class="timeStyle"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                            </tr>
                            <tr id="speTemp">
                                <td class="timeStyle">20<span class="tempUnit">&#8451;</span></td>                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="currWeatherLine">
                    <hr></hr>
                </div>
            </div>
        );
    }
}


class WeatherForecast extends React.Component {

    render() {
        return (
            <div id="forecastWeather">

            </div>
        );
    }
}


class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "Chengdu",
            overview: "raining",
            temperature: 24,
            highestTemp: 25,
            lowestTemp: 23
        };
    }




    render() {
        

        return(
            <div id="weather">
                <div id="locweather">
                    <LocationOverview location={this.state.location} overview={this.state.overview} temperature={this.state.temperature}/>
                </div>
                <div id="currweather">
                    <CurrentWeather highest={this.state.highestTemp} lowest={this.state.lowestTemp}/>
                </div>
                <div id="weatherFore">
                    <WeatherForecast />
                </div>                                
            </div>
        );
    }
}

ReactDOM.render(
    <Weather />,
    document.getElementById('root')
);