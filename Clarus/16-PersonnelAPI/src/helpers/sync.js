"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// SYCHRONIZATION:

module.exports = function() {

    return null;

    //! REMOVE DATABASE:
    require('mongoose').connect(process.env.MONGODB).then((db) => {
        db.connection.dropDatabase()
        console.log('- Database and all data REMOVED!')
    })

}