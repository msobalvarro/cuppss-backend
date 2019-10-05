const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const WriteError = require('./logs/write')
require('dotenv').config()

const { PORT } = process.env

const data = {
	app: true, // INT
	language: 'node' // STRING
}

// app.use(bodyParse.urlencoded({ extended: true }))

app.use(bodyParse.json())

app.get('/', (req, res) => {
	res.send('Api Running')
	WriteError('TEST Log')
})

app.use('/login', require('./middleware/auth'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))