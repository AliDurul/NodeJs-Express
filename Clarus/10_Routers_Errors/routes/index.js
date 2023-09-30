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
    msg: `this user id i: ${req.params.userId}`,
  });
});

module.exports = router;
