const Topping = require("../models/topping");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Topping"]
            #swagger.summary = "List Topping"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(Topping);
    res.status(200).send({
      error: false,
      count: data.length,
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Topping"]
            #swagger.summary = "Create Topping"
        */

    const data = await Topping.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Topping"]
            #swagger.summary = "Get Single Topping"
        */
    const data = await Topping.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Topping"]
            #swagger.summary = "Update Topping"
        */
    const data = await Topping.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      data,
      new: await Topping.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Topping"]
            #swagger.summary = "Delete Topping"
        */
    const data = await Topping.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
