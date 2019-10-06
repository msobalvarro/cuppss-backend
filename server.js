const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const WriteError = require('./logs/write')
const auth = require('./middleware/auth')
require('dotenv').config()

const { PORT } = process.env

const data = {
	app: true, // INT
	language: 'node' // STRING
}

// app.use(bodyParse.urlencoded({ extended: true }))

app.use(bodyParse.json())

app.get('/', auth, (req, res) => {
	res.json(req.user)
	WriteError('TEST Log')
})

app.use('/login', require('./controller/login'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))