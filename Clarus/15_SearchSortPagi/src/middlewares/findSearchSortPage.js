module.exports = (req, res, next) => {
    //* SEARCH
    const search = req.query?.search || {};
  
    for (let key in search) search[key] = { $regex: search[key], $options: "i" };
  
    //* SORTING
    const sort = req.query?.sort;
  
    //* LIMIT AND PAGINATION
    let limit = Number(req.query?.limit);
    limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE);
  
    let page = Number(req.query?.page || 1) - 1;
    page = (page > 0 ? page : 1) - 1;
  
    let skip = Number(req.query?.skip);
    skip = skip > 0 ? skip : limit * page;


    req.getModelFind = async (Model, populate = null) => {
      return await Model.find(search).sort(sort).skip(skip).limit(limit).populate(populate)
    }

    next()
  };
  