const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref : 'User',
        required:true
    },
    title:{
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '/image/blog/blog_default.png'
    },
    views : {
        type: Number,
        default: 0,
    },
},{
    timestamps:true
})

const Blog = mongoose.model('Blog',blogSchema)
module.exports = Blog