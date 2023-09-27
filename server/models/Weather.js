const mongoose = require('mongoose')

const weatherSchema = new mongoose.Schema({
    location: String,
  temperature: Number,
  humidity: Number,
  conditions: String,
})


module.exports = mongoose.model('Weather',weatherSchema)