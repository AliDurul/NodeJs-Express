require("express-async-errors");

const { BlogPost, BlogCategory } = require("../models/blogModel");

module.exports.BlogPost = {
  list: async (req, res) => {

    // searching
    const search = req.query?.search || {};
    for(let key in search) search[key] = { $regex: search[key], $options: "i" }

    const data = await BlogPost.find(search);

    // const data = await BlogPost.find().populate('blogCategoryId')

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
    const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body);

    res.status(202).send({
      error: false,
      result: await BlogPost.findById(req.params.postId),
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

  listInCategory: async (req, res) => {
    const data = await BlogPost.find({
      blogCategoryId: req.params.categoryId,
    }).populate("blogCategoryId");

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },
};

module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);

    res.status(201).send({
      error: false,
      result: data,
      body: req.body,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.findById(req.params.categoryId);

    res.status(202).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );

    res.status(202).send({
      error: false,
      result: await BlogCategory.findById(req.params.categoryId),
    });
  },
  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
