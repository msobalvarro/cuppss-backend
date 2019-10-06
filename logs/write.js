const log = require('simple-node-logger').createSimpleLogger('./logs/logs.log')

/**Register new message to log archive */
module.exports = (errStr = '', type = 'error') => {
    console.log(`${type}: ${errStr}`)
    
    log.log(type, errStr)
}