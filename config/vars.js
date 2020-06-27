require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })

// Imports all envs
const { PORT, DBHOST, DBNAME, DBUSER, DBPASS, JWTSECRET } = process.env

/**Variables de entorno ocultas */
const vars = { PORT, DBHOST, DBNAME, DBUSER, DBPASS, JWTSECRET }

module.exports = vars