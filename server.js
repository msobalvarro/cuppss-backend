const express = require('express')
// const jwt = require('')
const app = express()

require('dotenv').config()

const { JWTSECRET, PORT } = process.env

const data = {
	app: true, // INT
	language: 'node' // STRING
}

app.get('/', (req, res) => res.send(JWTSECRET))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))