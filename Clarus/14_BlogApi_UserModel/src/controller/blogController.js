require("express-async-errors");

const { BlogPost } = require("../models/blogModel");

module.exports.BlogPost = {
  list: async (req, res) => {
    const data = await BlogPost.find();

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
      
    });
  },
  create: async (req, res) => {
    const data = await BlogPost.create(req.body);

    res.status(201).send({
      error: false,
      result: data,
      body: req.body,
    });
  },
  read: async (req, res) => {
    const data = await BlogPost.findById(req.params.postId);

    res.status(202).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogPost.updateOne({_id:req.params.postId},req.body);

    res.status(202).send({
      error: false,
      result: await BlogPost.findById(req.params.postId),
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({_id:req.params.postId});

res.sendStatus((data.deletedCount >= 1) ? 204 : 404)

  },
};
