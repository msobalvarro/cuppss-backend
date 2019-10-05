/**Contain all queries of the aplication */
module.exports = {
    /**
     * Function returns string
     * **params**: `email` and `password` strings
     */
    login: `
        select D.FirstName, D.LastName, C.User
        from DescriptionHotelier D 
        inner join Credentials C
        on D.Credentials = C.Id
        where D.Email = ? 
        and C.Password = ?
    `
}