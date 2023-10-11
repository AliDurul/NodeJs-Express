const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
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
    blogPost : mongoose.model('BlogPost',blogPostSchema) 
}