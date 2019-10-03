const mysql = require('mysql')
const writeError = require('../logs/write')

require('dotenv').config()
const { DBHOST, DBNAME, DBUSER, DBPASS } = process.env

/**Function extends database connection functions */
module.exports = async (str = '', params = [], callback = (r = {}) => {}) => {

    let data = []
    const conection = await mysql.createConnection({
        database: DBNAME,
        host: DBHOST,
        user: DBUSER,
        password: DBPASS
    })

    /**Connect to dataBase */
    await conection.connect(
        (errConnect) => {
            if (errConnect) {
                writeError(errConnect)
                throw errConnect
            }
        }
    )

    /**Consult */
    await conection.query(str, params, (errQuery, results) => {
        if (errQuery) {
            writeError(errQuery)
            throw errQuery
        }
        
        callback(results)
    })

    conection.end(
        (errEnd) => {
            if (errEnd) {
                writeError(errEnd)
                throw errEnd
            }
        }
    )
} 