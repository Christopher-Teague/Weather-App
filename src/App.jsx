import React, {useState} from "react";
import axios from 'axios'

const apiKey = process.env.REACT_APP_WEATHER_API;

function App() {

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(weatherApi).then((response) => {
                setData(response.data)
                console.log(response.data)
            })

        }
    }

    return (

    <div className="app">
        <div className="container">
            <div className="search">
                <input
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder= 'Enter City'
                type="text"
                name="location"
                id="location" />
            </div>
            <div className="main">
                <div className="location">
                    <h2>{data.name}</h2>
                </div>
                <div className="temp">
                    {data.main ? <h1>{data.main.temp.toFixed()}° F </h1> : null}
                </div>
                <div className="description">
                    {data.weather ? <p>{data.weather[0].description}</p> : null}
                </div>
            </div>

    {data.name !== undefined &&

            <div className="bottom">
                <div className="feelsLike">
                    {data.main ? <p>{data.main.feels_like.toFixed()}° F</p> : null}
                    <p>Feels Like</p>
                </div>
                <div className="humidity">
                    {data.main ? <p>{data.main.humidity} %</p> : null}
                    <p>Humidity</p>
                </div>
                <div className="wind">
                    {data.wind ? <p>{data.wind.speed.toFixed()} mph</p> : null}
                    <p>Wind Speed</p>
                </div>
            </div>
    }
    </div>
    
    </div>
    )
}

export default App;