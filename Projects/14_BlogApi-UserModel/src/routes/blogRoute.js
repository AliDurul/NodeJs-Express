const { BlogPost,BlogCategory } = require("../controller/blogController");

const router = require("express").Router();

//* POST ROUTE
router.route("/post").get(BlogPost.list).post(BlogPost.create);

router
  .route("/post/:postId")
  .get(BlogPost.read)
  .put(BlogPost.update)
  .delete(BlogPost.delete);

//* CATEGORY ROUTE
  router.route("/category").get(BlogCategory.list).post(BlogCategory.create);

  router
    .route("/category/:categoryId")
    .get(BlogCategory.read)
    .put(BlogCategory.update)
    .delete(BlogCategory.delete);

    router.get('/category/:categoryId/posts', BlogPost.listInCategory)



module.exports = router ;
