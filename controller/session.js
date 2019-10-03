const Database = require('../config/conector')

/**Metod login */
const Session = {
    /**Method login */
    login: () => {
        const data = new Database()

        data.connect()

        const results = data.query('select * from Credentials')

        return results
    },

    /**Method logOut */
    logout: () => {

    }
}

module.exports = Session