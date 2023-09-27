import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import cloud from '../images/cloudy.png'

export default function TempApp() {
    const [location, setLocation] = useState("Bangalore");
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async (location) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/weather/${location}`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchWeatherData(location);
    }, []);

    const handleSearch = () => {
        if(location==""){
            alert('Enter the city')
        }
        fetchWeatherData(location);
        setLocation('')
    }

    const currentDate = new Date();
    const day = currentDate.toLocaleDateString('en-IN', { weekday: 'long' });

    return (
        <>
        <div className="container">
            <div className="main-container">
                <section className="box-container">

                    <header>
                        <h4>Weather App</h4>
                        <h4>{day}</h4>
                    </header>

                    <article className="search">
                        <h2>The Only Weather Forecast You Need</h2>
                        <div className="border-line"></div>
                        <input
                            type="text"
                            placeholder="Enter the city"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </article>
                </section>

                <section className="weather-data-section">


                    {!weatherData ? <p>Data not found</p> : (
                        <>
                            <h1>{weatherData.location}</h1>
                            <div className="weath-data">
                            <p className="temp">{weatherData.temperature}°C</p>
                            <p>Humidity: {weatherData.humidity}</p>
                            <p>Conditions: {weatherData.conditions}</p>
                            </div>
                        </>
                    )}

                <figure>
                    <img src={cloud} alt="cloud-image" className="cloud-img"/>
                </figure>
                </section>

                

            </div>

            </div>
        </>
    );
}
