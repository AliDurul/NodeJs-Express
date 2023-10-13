"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */


const  Department = require('../models/department.model')

module.exports.Department = {
    list: async (req,res) => {
      const data = await res.getModelList(Department)

      res.status(200).send({
        error:false,
        count:data.length,
        result:data
      })
    },
    create: async (req,res) => {
      const data = await Department.create(req.body)

      res.status(201).send({
        error:false,
        result:data
      })
    },
    read: async (req, res) => {
        const data = await Department.findById(req.params.departmentId);
    
        res.status(202).send({
          error: false,
          result: data,
        });
      },
      update: async (req, res) => {
        const data = await Department.updateOne(
          { _id: req.params.departmentId },
          req.body
        );
    
        res.status(202).send({
          error: false,
          result: await Department.findById(req.params.departmentId),
        });
      },
      delete: async (req, res) => {
        const data = await Department.deleteOne({ _id: req.params.departmentId });
    
        res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
      },

}
