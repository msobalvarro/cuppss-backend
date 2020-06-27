const express = require('express')
const router = express.Router()

// Import middlewares
const { check, validationResult } = require('express-validator')

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


    } catch (error) {
        const response = {
            error: true,
            message: error.toString()
        }

        res.send(response)
    }
})

module.exports = router