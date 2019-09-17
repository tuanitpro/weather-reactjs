import React, {
    Component
}
from 'react';

class Forecast extends Component {
    
    render (){
        const dataForecast = this.props.dataForecast;
      
        if(dataForecast){            
            if(dataForecast.current){
                return (
                    <div>
                    <div className="date">Thời tiết hôm nay: {dataForecast.current.date}</div>
                    <div className="temp">Nhiệt độ: {dataForecast.current.temp}<sup>o</sup>C</div>
                    <div className="weather">{dataForecast.current.weather}</div>
                    <div className="wind">{dataForecast.current.wind}</div>
                    </div>
                )
            }
            else{
                return (
                    <div>No data current</div>
                )
            }
            
        }
        else{
            return (
                <div>No data</div>
            )
        }
    }
}
export default Forecast;