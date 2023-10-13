"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personnel = require('../models/personnel.model')

module.exports.Personnel = {
    list: async (req,res) => {


      const data = await res.getModelList(Personnel,'departmentId')

      res.status(200).send({
        error:false,
        count:data.length,
        result:data
      })
    },
    create: async (req,res) => {
      const data = await Personnel.create(req.body)

      res.status(201).send({
        error:false,
        result:data
      })
    },
    read: async (req, res) => {
        const data = await Personnel.findById(req.params.personnelId);
    
        res.status(202).send({
          error: false,
          result: data,
        });
      },
      update: async (req, res) => {
        const data = await Personnel.updateOne(
          { _id: req.params.personnelId },
          req.body
        );
    
        res.status(202).send({
          error: false,
          result: await Personnel.findById(req.params.personnelId),
        });
      },
      delete: async (req, res) => {
        const data = await Personnel.deleteOne({ _id: req.params.personnelId });
    
        res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
      },

}