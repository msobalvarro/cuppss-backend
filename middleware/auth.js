const jwt = require('jsonwebtoken')

// Imports write erros
const WriteError = require('../logs/write')

// Import global vars
const { JWTSECRET } = require("../config/vars")

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')

    try {
        if (!token) {
            throw 'No token, authorization denied'
        }

        const decoded = jwt.verify(token, JWTSECRET)

        // Assign user to req
        req.user = decoded.user

        next()
    } catch (errorMessagge) {
        WriteError(`auth.js - error in authentication token`)

        return res.status(401).send({
            error: true,
            message: errorMessagge
        })
    }
}