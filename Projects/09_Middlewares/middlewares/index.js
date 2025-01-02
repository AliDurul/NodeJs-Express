const middleFunction1 = (req, res, next) => {
  const skip = req.query.skip ?? false;

  req.name = "ali ";
  res.lastName = "durul";

  skip ? next("route") : next(); // bir sonraki route a gider
};

const middleFunction2 = (req, res, next) => {
  res.send({
    Name: [req.name, res.lastName],
    msg: "this is func2",
  });
};

module.exports = [middleFunction1, middleFunction2];
