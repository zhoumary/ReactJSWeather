import './weather.css';
import Raining from './icons8-rain-cloud-50.png';

import React, { Component } from 'react'

class WeatherForecast extends Component {
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
      index = index%7;
    }
    return weekday[index];
  }
  
  renderForeWeather(j, i) {
    if (j === 0) {
      return (
        <div class="forecast">
          {this.getNextWeekDay(i)}
        </div>
      );
    } else if (j === 1) {
      return (
        <div class="forecast">
          <img class="weatherIcon" src={Raining} alt="raining" />
        </div>
      );
    } else if (j === 2) {
      return (
        <div class="forecast">
          25
          <span class="tempUnit">&#8451;</span>
        </div>
      );
    } else if (j === 3) {
      return (
        <div class="forecast">
          23
          <span class="tempUnit">&#8451;</span>
        </div>
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
        div.push(<div className="forecastRow">{children}</div>);
        divCount = divCount + 1;
      }
    }
    return div;
  }
  
  render() {
    return (
      <div id="forecastTable">
        {/* <div id="forecastTableCaption">
          <div id="forecastTableBody"> */}
        <div id="forecastTableBody"> 
            {this.createForecastList(7, 4)}
        </div>
          {/* </div>          
        </div> */}
      </div>
    )
  }
}

export default WeatherForecast
