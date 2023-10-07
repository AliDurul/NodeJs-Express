const mongoose = require("mongoose");

/* const nameSchema = new mongoose.Schema({

    fieldName: {
        type: String,
        default: null,
        trim: true,
        select: true,
        index: false,
        unique: false,
        required: [true,'Error-message'],
        enum:[[0,1,2,3], 'Error-Message'],
        validate:[function(data){return true},'Error-Message' ],
        get:function(data){return data},
        set:function(data){return data}
         
    }

},{
    collection:'collectionName',
    timestamps:true,
}) */

//! blog Category
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

//! blog post
const blogPostSchema = new mongoose.Schema(
  {
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

// const BlogPostModel = mongoose.model('BlogPost', blogPostSchema)

module.exports = {
  BlogPost: mongoose.model("BlogPost", blogPostSchema),
  BlogCategory: mongoose.model("BlogCategory", blogCategorySchema),
};
