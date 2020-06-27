if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// Imports all envs
const { PORT, DBHOST, DBNAME, DBUSER, DBPASS } = process.env

/**Variables de entorno ocultas */
const vars = { PORT, DBHOST, DBNAME, DBUSER, DBPASS }

module.exports = vars