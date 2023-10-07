const { BlogPost, BlogCategory } = require("../controllers/blogController");

const router = require("express").Router();

//! blog post
router.route("/post").get(BlogPost.list).post(BlogPost.create);

router
  .route("/post/:postId")
  .get(BlogPost.read)
  .put(BlogPost.update)
  .delete(BlogPost.delete);

//! blog category

router.route("/category").get(BlogCategory.list).post(BlogCategory.create);

router
  .route("/category/:categoryId")
  .get(BlogCategory.read)
  .put(BlogCategory.update)
  .delete(BlogCategory.delete);

module.exports = router;
