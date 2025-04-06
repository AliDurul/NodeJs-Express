const mongoose = require("mongoose");

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "blogCategories", timestamps: true }
);

const blogPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User", 
    },
    blogCategoryId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "BlogCategory",
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "blogPosts", timestamps: true }
);

module.exports = {
  BlogPost: mongoose.model("BlogPost", blogPostSchema),
  BlogCategory: mongoose.model("BlogCategory", blogCategorySchema),
};
