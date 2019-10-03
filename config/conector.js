const mysql = require('mysql')
const writeError = require('../logs/write')
require('dotenv').config()
const { DBHOST, DBNAME, DBUSER, DBPASS } = process.env

/**Variable global, this to say if ther are conection */
global.connectDB = false

/**class that extends database connection functions */
class Database {
    /**Open new conection */
    // conection = null

    /**Connect to database */
    connect() {
        this.conection = mysql.createConnection({
            database: DBNAME,
            host: DBHOST,
            user: DBUSER,
            password: DBPASS
        })

        this.conection.connect(
            (err) => {
                if (err) {
                    writeError(err)
                } else {
                    global.connectDB = true
                }
            }
        )
    }

    query(str = '', params = []) {
        // if (global.connectDB) {
            this.conection.query(str, params, (err, results, field) => {
                if (err) {
                    writeError(err)
                    throw err
                } else {
                    // console.log(results)
                    return results
                }
            })
        // } else {
        //     console.log('there is not conection to database')

        //     throw 'there is not conection to database'
        // }
    }

    /**Disconect Database */
    conectionEnd() {
        this.conection.end()

        global.connectDB = false
    }

}

module.exports = Database