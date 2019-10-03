const fs = require('fs')

/**Register new a log */
module.exports = (err = '') => {
    const newErrorText = err
    let errorsExist = ''
    const date = new Date()

    const archiveName = './internal.log'

    fs.readFile(archiveName, (errorRead, buf) => {
        if(errorRead) {
            console.log('Error in read log')
        } else {
            errorsExist = buf.toString()
        }
    })

    /**Const contain new error with format of log */
    const newError = `${errorsExist} \n ${date} -> ${newErrorText}`

    fs.writeFile(archiveName, newError, (newErrorWrite) => {
        if (newErrorWrite) {
            console.log(newErrorText)
        }

        console.log(`New error: ${newError}`)
    })
}