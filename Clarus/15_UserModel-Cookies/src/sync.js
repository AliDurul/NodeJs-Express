"use strict"

const User = require('./models/userModel')
const { BlogCategory, BlogPost } = require('./models/blogModel')

module.exports = async () => {

    /* User */

    // Get first user:
    const user = await User.findOne()
    // console.log(user._id)

    if (user) {
        BlogPost.updateMany({ //? Filter:
            "userId": { $exists: false } // field yok ise
        }, { //? Update:
            "userId": user._id // kaydı ata
            // $unset: { "userId": 1 } // field sil
        }).catch(err => console.log(err))
    }

    /* BlogCategory */

    // Get first blogCategory:
    const blogCategory = await BlogCategory.findOne()
    // console.log(blogCategory._id)

    if (blogCategory) {
        BlogPost.updateMany({ //? Filter:
            "blogCategoryId": { $exists: false } // field yok ise
        }, { //? Update:
            "blogCategoryId": blogCategory._id // kaydı ata
            // $unset: { "blogCategoryId": 1 } // field sil
        }).catch(err => console.log(err))
    }

    // End:
    console.log('* Synchronised *')
    /* Finished */
}