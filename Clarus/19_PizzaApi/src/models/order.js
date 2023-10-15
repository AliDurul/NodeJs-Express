"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");

/* ------------------------------------------------------- */
// Order Model:

const OrderSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    pizzaId: {
        type: Schema.Types.ObjectId,
        ref: 'Pizza',
        required: true,
    },

    size: {
        type: String,
        required: true,
        enum: ['Small', 'Medium', 'Large', 'XLarge']
    },

    quantity: {
        type: Number,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    totalPrice: {
        type: Number,
    },

}, {
    collection: 'orders',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = model('Order', OrderSchema)