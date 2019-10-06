const log4js = require('log4js')

/**Register new a log */
module.exports = (errStr = '') => {

    log4js.configure({
        appenders: {
            logs: {
                filename: './logs/logs.log',
                type: 'file'
            }
        },
        categories: {
            default: {
                appenders: ['logs'],
                level: 'error'
            }
        }
    })

    const logger = log4js.getLogger('logs')

    logger.log(errStr)

    // const newErrorText = err
    // let errorsExist = ''
    // const date = new Date()

    // const archiveName = './logs.log'

    // fs.readFile(archiveName, (errorRead, buf) => {
    //     if(errorRead) {
    //         console.log('Error in read log')
    //     } else {
    //         errorsExist = buf.toString()
    //     }
    // })

    // /**Const contain new error with format of log */
    // const newError = `${errorsExist} \n ${date} -> ${newErrorText}`

    // fs.writeFile(archiveName, newError, (newErrorWrite) => {
    //     if (newErrorWrite) {
    //         console.log(newErrorText)
    //     }

    //     console.log(`New error: ${newError}`)
    // })
}