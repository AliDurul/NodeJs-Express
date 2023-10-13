const { BlogPost } = require("../controller/blogController");

const router = require("express").Router();

router.route("/post").get(BlogPost.list).post(BlogPost.create);

router.route("/post/:postId").get(BlogPost.read).put(BlogPost.update).delete(BlogPost.delete)

module.exports = router;
