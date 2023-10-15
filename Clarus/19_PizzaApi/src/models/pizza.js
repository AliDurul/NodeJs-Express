"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- */

const PizzaSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    image: {
        type: String,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
    },

    toppings: [ // push, pull
        {
            type: Schema.Types.ObjectId,
            ref: 'Topping'
        }
    ]

}, {
    collection: 'pizzas',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = model('Pizza', PizzaSchema)