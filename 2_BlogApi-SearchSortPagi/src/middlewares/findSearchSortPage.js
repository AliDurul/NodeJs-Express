"use strict";

module.exports = (req, res, next) => {
  // searching
  const search = req.query?.search || {};
  for (let key in search) search[key] = { $regex: search[key], $options: "i" };

  // sorting
  const sort = req.query?.sort || {};

  // pagination
  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE);

  let page = Number(req.query?.page);
  page = (page > 0 ? page : 1) - 1;
  
  let skip = Number(req.queery?.skip) || limit * page;
  skip = skip > 0 ? skip : page * limit;

  // const data = await BlogPost.find(search).sort(sort).skip(skip).limit(limit).populate('blogCategoryId')


   req.getModelList = async (Model, populate = null) => {
    return await Model.find(search).sort(sort).skip(skip).limit(limit).populate(populate)
  }
  next()
};
