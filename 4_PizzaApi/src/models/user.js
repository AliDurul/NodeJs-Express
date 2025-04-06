"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "username": "test",
    "password": "1234",
    "email": "abc@site.com",
    "isAdmin": "true"
  }
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password)
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Email field must be required'],
        unique: [true, 'There is this email. Email field must be unique'],
        validate: [
            (email) => email.includes('@') && email.includes('.'),
            'Email type is not correct.'
        ]
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

}, {
    collection: 'users',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)