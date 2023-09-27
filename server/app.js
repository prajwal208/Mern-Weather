const express = require('express')
const app = express()
const mongoose = require('mongoose')
const weatherRouter = require('./routes/Weather')
require('dotenv').config()
const cors = require('cors')

//middlewear
app.use(express.json())
app.use(cors())

app.use('/api',weatherRouter)

//connect to mongodb
const connectdb = () => {
mongoose.connect(process.env.MONGOOSE_URI)
console.log('Connected to database...')
}


const PORT = process.env.PORT || 5000
app.listen(PORT,() => {
    connectdb()
    console.log(`Server started at Port ${PORT}...`);
})