import React, {
    Component
} from 'react';
import Forecast from './Forecast';
import fetchJsonp from 'fetch-jsonp';

const cities = [
    { text : 'Đà Nẳng', value : 15 },
    { text : 'Hải Phòng', value : 27 },
    { text : 'Nha Trang', value : 32 },
    { text : 'Pleiku', value : 21 },
    { text : 'Sơn La', value : 52 },
    { text : 'Hồ Chí Minh', value : 29 },
    { text : 'Hà  Nội', value : 24 },
    { text : 'Việt Trì', value : 44 },
    { text : 'Vinh', value : 41 },
];

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityCode: '29',
            cityName: 'Hồ Chí Minh',
            dataForecast: {}
        }

        this.searchCity = this.searchCity.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.createOption = this.createOption.bind(this);
    }

    searchCity(event) {
        const self = this;
        const rand = Date.now();
        const url_api = 'https://usi-saas.vnexpress.net/weather/next3days?loc='+this.state.cityCode+'&is_full=1&_='+rand;
        fetchJsonp(url_api)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            self.setState({dataForecast: json.data});
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })

        event.preventDefault();
    }
    onTextChange(event) {       
        var index = event.nativeEvent.target.selectedIndex;
        const cityName = event.nativeEvent.target[index].text;
        this.setState({
            cityCode: event.target.value,
            cityName: cityName
        });
        this.searchCity(event);
    }
    componentDidMount() {
        const self = this;
        const rand = Date.now();
        const url_api = 'https://usi-saas.vnexpress.net/weather/next3days?loc='+this.state.cityCode+'&is_full=1&_='+rand;
        fetchJsonp(url_api)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            self.setState({dataForecast: json.data});
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    }
    createOption(item){
        return <option value={item.value} key={item.value}>{item.text}</option>
    }
    render() {
        let listOptions = cities.map(this.createOption);
        return (
            <div className="weatherBoard">
            <div className="header">
                <form onSubmit={this.searchCity}>                
                <select value={this.state.cityCode} options={cities} onChange={this.onTextChange}>
                  {listOptions}
                </select>
                <button type="submit">Search</button>
                </form>
                <div className="region">
                    Khu vực: {this.state.cityName}
                </div>
                <Forecast dataForecast={this.state.dataForecast} />
            </div>
        </div>
        )
    }
}
export default Weather;