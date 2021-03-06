require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MOGODB_URI = process.env.MOGODB_URI
const PORT = process.env.PORT || 3001
const usersRoutes = require('./routes/users.js')
const axios = require('axios')
const path = require('path')

mongoose.connect(MOGODB_URI, { useNewUrlParser: true }, (err) => {
  console.log(err || 'Connected to MOngoDB')
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('/api', (req, res) => {
  res.json({ message: 'API root' })
})

app.use('/api/users', usersRoutes)

// 3rd Part API: Google Places API
app.get('/browse', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.API_KEY}&location=${req.query.lat},${req.query.lng}&radius=50000&type=${req.query.type}`)
    .then(({ data }) => {
      res.json({ data })
    }).catch(err => {
      console.log(err)
    })
})

app.get('/geocode', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.cityname}&key=${process.env.API_KEY}`)
    .then(({ data }) => {
      res.json({ data })
    }).catch(err => {
      console.log(err)
    })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(PORT, (err) => {
  console.log(err || `Server running on port ${PORT}.`)
})
