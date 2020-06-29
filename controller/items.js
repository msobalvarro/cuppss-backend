const express = require("express")
const router = express.Router()

// Import middlewares
const { check, validationResult } = require('express-validator')

// Imports mysql config and query
const query = require("../config/query")

const { createItem } = require("../config/queries")

const checkParams = [
    check("type", "type is requerid").exists(),
    check("description", "description is requerid").isString().exists(),
    check("line", "line is requerid").isString().exists(),
    check("sub_line", "sub line is requerid").isString().exists(),
    check("state", "state is requerid").isString().exists()
]

router.post("/add", checkParams, (req, res) => {
    try {
        // Check errors
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw errors.array()[0].msg
        }

        const { type, description, line, sub_line, state } = req.body

        const allTypes = ["item", "linea", "sublinea"]

        // Validamos estados
        // if (state !== "activo" || state !== "inactivo") {
        //     throw "State is not valid"
        // }

        // Verificamos si la descripcion se encuentra en el catalogo
        if (!allTypes.includes(type)) {
            throw "Type is not valid"
        }

        let params = []

        switch (type) {
            // En este caso es cuando la descrupcion es de `item`
            case allTypes[0]:
                params = [type, description, line, sub_line, state]
                break;

            // Este caso es cuando la descripocion de de `linea`
            case allTypes[1]:
                params = [type, description, null, null, null]
                break;

            // Caso cuando la descripcion es de `sublinea`
            case allTypes[2]:
                params = [type, description, line, null, null]
                break;
        }

        console.log(params)

        query(createItem, params).then(e => {
            const response = e[0]

            res.send({ success: true, response })
        }).catch((error) => {
            console.log(error)
            // throw 
        })


    } catch (error) {
        const response = {
            error: true,
            message: error.toString()
        }

        res.send(response)
    }
})

router.get("/get/data", async (_, res) => {
    const queryLine = "select * from linea"
    const queryStrSubLine = "select * from sublinea"
    const queryStrState = "select * from estado"

    const arrLines = []
    const arrSubLines = []
    const arrStates = []

    await query(queryLine).then(response => {

            for (let index = 0; index < response.length; index++) {
                const element = response[index]

                arrLines.push(element.descr)
            }
        })


    await query(queryStrSubLine).then(response => {
            for (let i = 0; i < response.length; i++) {
                const element = response[i]

                arrSubLines.push(element)
            }
        })

    await query(queryStrState).then(response => {            
            for (let i = 0; i < response.length; i++) {
                const element = response[i].descr

                arrStates.push(element)
            }
        })

    const response = {
        lines: arrLines,
        sublines: arrSubLines,
        states: arrStates
    }

    res.send(response)
})

module.exports = router