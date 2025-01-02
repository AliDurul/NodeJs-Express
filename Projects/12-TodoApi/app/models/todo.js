"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//* SEQUELIZE
//? npm i sequelize sqlite3

const { sequelize, DataTypes } = require('../dbConnection')

// sequelize.define('tableName', { columns })
const Todo = sequelize.define('todo', {
    // https://sequelize.org/docs/v7/models/data-types/
     
    // id: { //? Not need define ID field, it will create auto.
    //     type: DataTypes.INTEGER,
    //     unique: true,
    //     allowNull: false, // default: true
    //     field: 'custom_column_name', // Change column name
    //     comment: 'Description',
    //     primaryKey: true,
    //     autoIncrement: true,
    // },

    title: {
        type: DataTypes.STRING(64), // varchar(64)
        allowNull: false,
    },

    description: DataTypes.TEXT, // ShortHand Using.

    priority: { // 1: High, 0: Normal, -1: Low
        type: DataTypes.TINYINT, // postgres: INTEGER
        allowNull: false,
        defaultValue: 0, // set default value.
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    
    //? Not need define "createdAt" & "updatedAt" fields.
    // createdAt: false, // Unset
    // updatedAt: false, // Unset
})

module.exports = Todo