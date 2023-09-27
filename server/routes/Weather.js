const router = require('express').Router()
const axios = require('axios')
require('dotenv').config()
const Weather = require('../models/Weather')

router.get('/weather/:location',async(req,res) => {
    const location = req.params.location

    try {
        const apiKey = process.env.APIKEY

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        
        const weatherData = {
            location: response.data.name,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            conditions: response.data.weather[0].description,
          };

          res.status(200).json(weatherData)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.post('/weather',async (req,res) => {
    const {location,temperature,humidity,conditions} = req.body

    try {
        const newWeatherData = Weather.create({
            location,
            temperature,
            humidity,
            conditions
        })
        await newWeatherData.save()
        res.status(200).json(newWeatherData)

    } catch (error) {
        res.status(500).send(error)   
    }
})


module.exports = router