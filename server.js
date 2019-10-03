const express = require('express')
// const jwt = require('')
const app = express()
const WriteError = require('./logs/write')
require('dotenv').config()

const { JWTSECRET, PORT } = process.env

const data = {
	app: true, // INT
	language: 'node' // STRING
}

app.get('/', (req, res) => {
	res.send(req.path)
	WriteError('HOLA KE ASE')
})

app.use('/login', require('./middleware/auth'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))