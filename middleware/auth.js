const express = require('express')
const router = express.Router()
// const jwt = require('jsonwebtoken')
const query = require('../config/query')
const queries = require('../controller/queries')
const { check, validationResult } = require('express-validator')

require('dotenv').config()

// const { JWTSECRET } = process.env

router.get('/', (req, res) => {
    res.status(500).send('Server Error')
})

router.post('/', [
    check('username', 'Please include a valid user name'),
    check('password', 'Password is required'),
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // const { username, password } = req.body

    try {
        query(queries.login, [], (results) => {
            return res.json(results)
        })
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