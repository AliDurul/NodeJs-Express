const router = require("express").Router();

const {User} = require('../controllers/userController')

router.route("/").get(User.list).post(User.create);

router
  .route("/:userId")
  .get(User.read)
  .put(User.update)
  .delete(User.delete);

module.exports = router