"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel.model')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "List Personnels"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Personnel, {}, 'departmentId')

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Personnel),
            data
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Create Personnel"
            #swagger.description = "Look to <b>'Models/Personnel'</b> for parameters."
            #swagger.parameters['body'] = {
                in: 'body',
                required: 'true',
                schema: {
                    $ref: '#/definitions/Personnel'
                }
            }
        */

        // isLead Control:
        const isLead = req.body?.isLead || false
        if (isLead) {
            const xyz = await Personnel.updateMany({ departmentId: req.body.departmentId, isLead: true }, { isLead: false })
        }

        const data = await Personnel.create(req.body)

        res.status(201).send({
            error: false,
            data
        })

    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Get Single Personnel"
        */

        const data = await Personnel.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Update Personnel"
            #swagger.description = "Look to <b>'Models/Personnel'</b> for parameters."
            #swagger.parameters['body'] = {
                in: 'body',
                required: 'true',
                schema: {
                    $ref: '#/definitions/Personnel'
                }
            }
        */

        // isLead Control:
        const isLead = req.body?.isLead || false
        if (isLead) {
            const { departmentId } = await Personnel.findOne({ _id: req.params.id }, { departmentId: 1 })
            await Personnel.updateMany({ departmentId, isLead: true }, { isLead: false })
        }

        const data = await Personnel.updateOne({ _id: req.params.id }, req.body)

        res.status(202).send({
            error: false,
            data,
            new: await Personnel.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Delete Personnel"
        */

        const data = await Personnel.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },

    // LOGIN & LOGOUT:

    login: async (req, res) => {

        const { username, password } = req.body

        if (username && password) {

            const user = await Personnel.findOne({ username, password })
            if (user) {

                // Set Session:
                req.session = {
                    id: user._id,
                    password: user.password
                }
                // Set Cookie:
                if (req.body?.rememberMe) {
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 Days
                }

                res.status(200).send({
                    error: false,
                    user
                })

            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong Username or Password.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Please entry username and password.')
        }
    },

    logout: async (req, res) => {
        // Set session to null:
        req.session = null
        res.status(200).send({
            error: false,
            message: 'Logout: Sessions Deleted.'
        })
    },
}