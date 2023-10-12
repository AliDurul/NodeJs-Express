
const router = require("express").Router();

const {User} = require('../controller/userController')


router.route("/").get(User.list).post(User.create);

router
  .route("/:userId")
  .get(User.read)
  .put(User.update)
  .delete(User.delete);


  //* LOGIN

  router.post('/login', User.login)
  router.post('/logout', User.logout)

  module.exports = router