const express = require('express')
const bodyParse = require('body-parser')
const path = require("path")

// initialize app
const app = express()

// Imports middleware
const useragent = require('express-useragent')
const auth = require('./middleware/auth')

// Import plugins
const cors = require('cors')
const helmet = require('helmet')

// Import controllers
const login = require('./controller/login')
const register = require("./controller/register")
const items = require("./controller/items")

// Imports vars
const { PORT } = require("./config/vars")

app.use(useragent.express())

app.use(helmet())

app.use(cors())

// User for parse get json petition
app.use(bodyParse.json())

app.use(express.static(path.join(__dirname, 'build')))


// Api get and post index 
app.get('/', (_, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Api authentication login
app.use('/login', login)

// Api for register user
app.use("/register", register)

// Api for create and modify item
app.use("/items", items)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))