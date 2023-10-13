"use strict"

const User = require('./models/userModel')
const { BlogCategory, BlogPost } = require('./models/blogModel')

module.exports = async () => {

    /* User *

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

    /* BlogCategory *

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

    /* Exampla Data */
    // Deleted All Records:
    await User.deleteMany().then(() => console.log(' - User Deleted All'))
    await BlogCategory.deleteMany().then(() => console.log(' - BlogCategory Deleted All'))
    await BlogPost.deleteMany().then(() => console.log(' - BlogPost Deleted All'))

    // Example User:
    const user = await User.create({
        email: "test@test.com",
        password: "12345678",
        firstName: "Test",
        lastName: "Test"
    })
    // Example Category:
    const blogCategory = await BlogCategory.create({
        name: 'Test Category'
    })
    // Example Posts:
    for (let key in [...Array(200)]) {
        await BlogPost.create({
            userId: user._id,
            blogCategoryId: blogCategory._id,
            title: `test ${key} title`,
            content: `test ${key} content`,
            published: Boolean(key%2)
        })
    }

    // End:
    console.log('* Synchronised *')
    /* Finished */
}