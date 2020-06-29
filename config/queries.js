/**Contain all queries of the aplication */
module.exports = {
    /**
     * Function returns string
     * **params**: `email` and `password` strings
     */
    login: 'call Login (?, ?)',

    /**
     * Procedimiento que registra o actualiza un usuario
     * @param {String} type
     * @param {String} username
     * @param {String} password
     * @param {String} avatar
     */
    createUpdateUser: `call ingresa_actualiza_usuarios(?, ?, ?, ?)`,


    /**
     * Procedimiento para crear o actualizar un item
     * @param {String} parameterType
     * @param {String} description
     * @param {String} line
     * @param {String} sub_line
     * @param {String} state
     */
    createItem: `call ingresa_item(?, ?, ?, ?, ?)`
}