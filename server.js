const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const useragent = require('express-useragent')
require('dotenv').config()

const { PORT } = process.env

app.use(useragent.express())

// User for parse get json petition
app.use(bodyParse.json())

// Api get and post index 
app.get('/', (req, res) => {
	res.send('Api runing')
})

app.post('/', (req, res) => {
	res.status(500).send('Server error')
})

// Api authentication login
app.use('/login', require('./controller/login'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))