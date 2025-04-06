
const router = require("express").Router();

const {User} = require('../controller/userController')


  //* LOGIN

  router.post('/login', User.login)
  router.all('/logout', User.logout)

  //* USER

router.route("/").get(User.list).post(User.create);

router
  .route("/:userId")
  .get(User.read)
  .put(User.update)
  .delete(User.delete);




  module.exports = router