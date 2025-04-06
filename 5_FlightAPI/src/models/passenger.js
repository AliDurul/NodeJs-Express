"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const {Schema, model} = require('mongoose')
const validator = require('validator');

const PassangerSchema = new Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    gender:{
        type:String,
        trim:true,
        required:true,
        enum:['Female',"Male"]
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate: [
            validator.isEmail ,
            'Please provide a valid Email Address.'
        ]
    },
    createdId:{
        type:Schema.ObjectId,
        ref:"User"
    }
}, {collection:'passengers', timestamps:true})

module.exports = model("Passenger", PassangerSchema)