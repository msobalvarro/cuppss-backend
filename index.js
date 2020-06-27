const express = require('express')
const bodyParse = require('body-parser')

// initialize app
const app = express()

// Imports middleware
const useragent = require('express-useragent')
const auth = require('./middleware/auth')

// Import controllers
const login = require('./controller/exceptions')
const register = require("./controller/register")

// Imports vars
const { PORT } = require("./config/vars")

app.use(useragent.express())

// User for parse get json petition
app.use(bodyParse.json())

// Api get and post index 
app.get('/', (_, res) => {
	res.send("aplication runing")
})

// Api authentication login
app.use('/login', require('./controller/login'))

// Api for register user
app.use("/register", register)

// Api Control exceptions App
app.use('/controlError', auth, login)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))