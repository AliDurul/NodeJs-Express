require("express-async-errors");

const { BlogPost, BlogCategory } = require("../models/blogModel");

module.exports.BlogPost = {
  list: async (req, res) => {
    //! searching & sorting & pgination

   
    // const data = await BlogPost.find(search).sort(sort).skip(skip).limit(limit).populate('blogCategoryId')

const data = await req.getModelList(BlogPost, 'blogCategoryId')

    res.status(200).send({ 
      error: false,
      count: data.length,
      result: data,
    });
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
  create: async (req, res) => {
    const data = await BlogPost.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogPost.findById(req.params.postId);

    res.status(200).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body);
    res.status(202).send({
      error: false,
      body: req.body,
      result: data,
      newData: await BlogPost.findById(req.params.postId),
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports.BlogCategory = {
  list: async (req, res) => {
    // const data = await BlogCategory.find();
    const data = await req.getModelList(BlogCategory)
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
      body: req.body,
      result: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.findById(req.params.categoryId);

    res.status(200).send({
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
      body: req.body,
      result: data,
      newData: await BlogCategory.findById(req.params.categoryId),
    });
  },
  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
