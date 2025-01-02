"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// app.use(errorHandler):

module.exports = (err, req, res, next) => {


    let cause = err.cause || 'Unknown Error';

    if (err.reservedDates) {
        cause = (err.reservedDates);
    }

    return res.status(res?.errorStatusCode || 500).send({
        error: true,
        message: err.message,
        cause,
        body: req.body,
        stack: err.stack
    });
}


