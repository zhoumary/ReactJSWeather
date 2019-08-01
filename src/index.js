import React from 'react';
import ReactDOM from 'react-dom';
// import Forecast from './forecast';
import './index.css';
import Raining from './rain.png';

const host = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "a81a067d035dd84954e1a0d2c907e813";
class LocationOverview extends React.Component {    
    render() {
        return (
            <div id="overviewinfo">
                {this.props.weatherInfo}
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
        weekday[5] = "Friday";
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
                    <hr class="Line"></hr>
                </div>
                <div id="timeWeather">
                    <table id="weatherDetails">
                        <tbody>
                            <tr id="time">
                                <td class="timeStyle" id="firstTime">Now</td>
                                <td class="timeStyle">6PM</td>
                                <td class="timeStyle">7PM</td>
                                <td class="timeStyle">8PM</td>
                                <td class="timeStyle">9PM</td>
                            </tr>
                            <tr id="weatherSymbol">
                                <td class="timeStyle" id="firstImage"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                                <td class="timeStyle"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                                <td class="timeStyle"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                                <td class="timeStyle"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                                <td class="timeStyle"><img class="weatherIcon" src={Raining} alt="raining" /></td>
                            </tr>
                            <tr id="speTemp">
                                <td class="timeStyle" id="firstTemp">20<span class="tempUnit">&#8451;</span></td>                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="currWeatherLine">
                    <hr class="Line"></hr>
                </div>
            </div>
        );
    }
}

class Forecast extends React.Component {
    getNextWeekDay(i) {
        const day = new Date();
        const weeklyNum = day.getDay();
        var weekday = new Array(7);
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        weekday[0] = "Sunday";
        let index = weeklyNum + i + 1;
        if (index > 6) {
            index = index % 7;
        }
        return weekday[index];
    }

    renderForeWeather(j, i) {
        if (j === 0) {
            return (
                <td class="forecast" id="weekday">
                    {this.getNextWeekDay(i)}
                </td>
            );
        } else if (j === 1) {
            return (
                <td class="forecast">
                    <img class="weatherIcon" src={Raining} alt="raining" />
                </td>
            );
        } else if (j === 2) {
            return (
                <td class="forecast">
                    25
                    <span class="tempUnit">&#8451;</span>
                </td>
            );
        } else if (j === 3) {
            return (
                <td class="forecast">
                    23
                    <span class="tempUnit">&#8451;</span>
                </td>
            );
        }

    }

    createForecastList(row, column) {
        let div = [];
        if (row) {
            let divCount = 0;
            for (let i = 0; i < row; i++) {
                let children = [];
                //Inner loop to create children
                for (let j = 0; j < column; j++) {
                    children.push(this.renderForeWeather(j, i));
                }

                //Create the parent and add the children
                div.push(<tr className="forecastRow">{children}</tr>);
                divCount = divCount + 1;
            }
        }
        return div;
    }

    render() {
        return (
            <div id="forecastTable">
                <table id="forecastTableBody">
                    <tbody>
                        {this.createForecastList(7, 4)}
                    </tbody>
                </table>
            </div>
        )
    }
}


class Weather extends React.Component {
    componentDidMount(cityID) {
        let queryParam = "?id=" + "1815286" + "&APPID=" + apiKey;
        let url = host + queryParam;
        if (url) {
            fetch(url).then(
                response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Request failed');
                }, networkError => console.log(networkError.message)
            ).then( jsonResponse => {
                let div = [];

                let location = jsonResponse.name;
                div.push(<div id="overview">{location}</div>);
                
                let weather = jsonResponse.weather;
                let weatDesc;
                if (weather) {
                    let current = weather[0];
                    if (current) {
                        weatDesc = current.main;
                        div.push(<div id="overview">{weatDesc}</div>);
                    }                    
                }                

                let main = jsonResponse.main;
                let temperature;
                if (main) {
                    let test = main.temp;
                    if (main.temp) {
                        temperature = tempConversion(main.temp);
                        div.push(<div id="temperature">{temperature}<span class="tempUnit">&#8451;</span></div>);
                    }
                }
                
                this.setState({
                    weatherInfo: div
                });
            });
        }
    }
    
    // componentDidMount() {
    //     console.log('I am about to say hello');
    // }    
    
    
    constructor(props) {
        super(props);
        this.state = {
            weatherInfo: null,
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
                    <LocationOverview location={this.state.location} overview={this.state.overview} temperature={this.state.temperature}
                    weatherInfo={this.state.weatherInfo}/>
                </div>
                <div id="currweather">
                    <CurrentWeather highest={this.state.highestTemp} lowest={this.state.lowestTemp}/>
                    <Forecast />
                </div>
                <div id="weatherFore">
                    
                </div>
                <div class="currWeatherLine">
                    <hr class="Line"></hr>
                </div>                              
            </div>
        );
    }
}

ReactDOM.render(
    <Weather />,
    document.getElementById('root')
);


function tempConversion(kTemp) {
    let cTemp
    if (kTemp) {
        cTemp = (kTemp - 273.15).toFixed(2);
    }

    return cTemp;
}
