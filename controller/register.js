const express = require('express')
const router = express.Router()
const crypto = require("crypto-js")

// Import middlewares
const { check, validationResult } = require('express-validator')

// import mysql queries
const query = require("../config/query")

// import query
const { createUpdateUser } = require("../config/queries")

// import vars
const { JWTSECRET } = require("../config/vars")

const verifyParams = [
    check("type", "Type user is required").isString().exists(),
    check("username", "Username is required").isString().exists(),
    check("password", "Password is require").isString().exists(),
    check("avatar_url", "Avatar url is required").isString().exists()
]

router.post("/", verifyParams, (req, res) => {
    try {
        // Check errors
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw errors.array()[0].msg
        }

        // params with post method
        const { type, username, password, avatar_url } = req.body

        const passwordEncrypt = crypto.SHA256(password, JWTSECRET).toString()

        query(createUpdateUser, [type, username, passwordEncrypt, avatar_url])
            .then((response) => {
                const typeResponse = response[0].response

                // Type message response
                const message = typeResponse === 0 ? "Tu usuario se ha creado" : "Tu usuario se ha modificado"

                res.send({ success: true, message })
            })

    } catch (error) {
        const response = {
            error: true,
            message: error.toString()
        }

        res.send(response)
    }
})

module.exports = router