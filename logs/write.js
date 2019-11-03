const log = require('simple-node-logger').createSimpleLogger('./logs/logs.log')
const logApp = require('simple-node-logger').createSimpleLogger('./logs/app.log')

/**Register new message to log archive */
module.exports = (errStr = '', type = 'error', app = false) => {
    // console.log(`${type}: ${errStr}`)
    if (app) {
        logApp.log(type, errStr)
    } else {
        log.log(type, errStr)
    }
}