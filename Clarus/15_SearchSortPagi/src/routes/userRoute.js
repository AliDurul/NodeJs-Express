const router = require("express").Router();

const {User} = require('../controllers/userController')

//! user
router.route("/").get(User.list).post(User.create);

router
  .route("/:userId")
  .get(User.read)
  .put(User.update)
  .delete(User.delete);



//! login

router.post('/login', User.login)
router.post('/logut', User.logout)



module.exports = router