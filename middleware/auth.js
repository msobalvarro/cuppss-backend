const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const WriteError = require('../logs/write')
const query = require('../config/query')
const queries = require('../controller/queries')
const { check, validationResult } = require('express-validator')
require('dotenv').config()

const { JWTSECRET } = process.env

router.get('/', (req, res) => {
    res.status(500).send('Server Error')
})

router.post('/', [
    // Validate data params with express validator
    check('email', 'Please include a valid user name').isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: errors.array()[0].msg
        })
    }


    try {
        const { email, password } = req.body

        query(queries.login, [email, password], (results) => {

            if (results.length > 0) {
                const playload = {
                    username: results[0].User
                }

                // Generate Toke user
                jwt.sign(
                    playload,
                    JWTSECRET,
                    {
                        expiresIn: 36000
                    },
                    (errSign, tokenId) => {
                        if (errSign) {
                            WriteError(`auth.js - error in generate token | ${errSign}`)
                            throw errSign
                        } else {
                            const data = {
                                name: `${results[0].FirstName} ${results[0].LastName}`,
                                username: results[0].User,
                                token: tokenId
                            }

                            return res.json(data)
                        }
                    }
                )
            }
            else {
                const response = {
                    error: true,
                    message: 'Email or password is incorrect'
                }

                res.status(401).send(response)
            }

        })
    } catch (error) {
        /**Error information */
        WriteError(`auth.js - catch execute query | ${error}`)

        const response = {
            error: true,
            message: error
        }

        res.status(500).send(response)
    }
})


module.exports = router