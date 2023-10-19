"use strict"

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const {Schema , model} = require("mongoose")

const ReservationSchema = new Schema({
    flightId:{
        type:Schema.Types.ObjectId,
        ref:"Flight",
    },
    passengers: [ ],
    createdId:{
        type:Schema.ObjectId,
        ref:"User"
    }

},{collection:'reservations', timestamps:true})

module.exports = model("Reservation",ReservationSchema )