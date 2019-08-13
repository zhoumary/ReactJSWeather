import './forecast.css';
import React, { Component } from 'react'


const host = "https://api.openweathermap.org/data/2.5/";
const apiKey = "a81a067d035dd84954e1a0d2c907e813";
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
        if (this.props.forecastData) {
            if (j === 0) {
                return (
                    <td class="forecast" id="weekday">
                        {this.getNextWeekDay(i)}
                    </td>
                );
            } else if (j === 1) {
                return (
                    <td class="forecast">
                        <img class="weatherIcon" src={this.props.forecastData[i][j]} alt={this.props.forecastData[i][j - 1]} />
                    </td>
                );
            } else if (j === 2) {
                return (
                    <td class="forecast">
                        {this.props.forecastData[i][j]}
                        <span class="tempUnit">&#8451;</span>
                    </td>
                );
            } else if (j === 3) {
                return (
                    <td class="forecast">
                        {this.props.forecastData[i][j]}
                        <span class="tempUnit">&#8451;</span>
                    </td>
                );
            }         
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
        if (!this.props.forecastData) {
            return <div />
        }
        
        return (
            <div id="forecastTable">
                <table id="forecastTableBody">
                    <tbody>
                        {this.createForecastList(5, 4)}
                    </tbody>
                </table>
            </div>

        )
    }
}


export default Forecast
