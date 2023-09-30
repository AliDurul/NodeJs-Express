const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({
    msg: "this is home",
  });
});
router.get("/about", (req, res) => {
  res.send({
    msg: "this is about",
  });
});
router.get("/user/:userId", (req, res) => {
  res.send({
    msg: "this is user",
  });
});

module.exports = router;
