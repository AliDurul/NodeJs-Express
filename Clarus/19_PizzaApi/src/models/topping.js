"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "name": "Sucuk"
}
/* ------------------------------------------------------- */
// Topping Model:

const ToppingSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

}, {
    collection: 'toppings',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Topping', ToppingSchema)