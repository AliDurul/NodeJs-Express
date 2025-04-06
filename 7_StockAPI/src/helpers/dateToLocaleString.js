"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// dateToLocaleString(date:Date):

module.exports = function (dateData) {
    return dateData.toLocaleString('en-en', { dateStyle: 'full', timeStyle: 'medium' })
}