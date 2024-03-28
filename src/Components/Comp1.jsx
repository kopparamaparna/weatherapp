import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Comp1.css';

const Comp1 = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = () => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`)
                .then(response => {
                    setWeatherData(response.data);
                })
                .catch(error => {
                    setError('Error fetching data. Please try again.');
                });
        };

        if (location) {
            fetchData();
        }
    }, [location]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setLocation(event.target.value);
        }
    };

    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder='Enter Location'
                    type="text"
                />
            </div>
            {error && <p>{error}</p>}
            {weatherData && (
                <div className="container">
                    <table>
                        <tbody>
                            <tr>
                                <td>Location</td>
                                <td>{weatherData.name}</td>
                            </tr>
                            <tr>
                                <td>Temperature</td>
                                <td>{weatherData.main.temp.toFixed()}°F</td>
                            </tr>
                            <tr>
                                <td>Atmospheric Feel</td>
                                <td>{weatherData.weather[0].main}</td>
                            </tr>
                            <tr>
                                <td>Feels Like</td>
                                <td>{weatherData.main.feels_like.toFixed()}°F</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{weatherData.main.humidity}%</td>
                            </tr>
                            <tr>
                                <td>Wind Speed</td>
                                <td>{weatherData.wind.speed.toFixed()} MPH</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Comp1;
