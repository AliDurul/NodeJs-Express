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

// const BlogPostModel = mongoose.model('BlogPost', blogPostSchema) 

module.exports = {
    BlogPost: mongoose.model('BlogPost', blogPostSchema) 
}