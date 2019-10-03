const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Session = require('../controller/session')
const { check, validationResult } = require('express-validator')

require('dotenv').config()

const { JWTSECRET } = process.env

router.get('/', (req, res) => {
    res.status(500).send('Server Error')
})

router.post('/', [
    check('username', 'Please include a valid user name'),
    check('password', 'Password is required'),
], (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // const { username, password } = req.body

    try {
        const data = Session.login()
        res.send(data)
    } catch (error) {
        /**Error information */
        const response = {
            error: true,
            message: error
        }

        res.status(500).send(response)
    }
})


module.exports = router