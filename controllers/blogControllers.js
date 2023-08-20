const Blog = require("../models/Blog")
const path = require('path')
const fs = require('fs')

exports.createBlog=async(req,res,next)=>{
    
    try {
        if (req.file) {
            const newBlog = new Blog({
                ...req.body,
                user : req.body.userId,
                image: `/image/blog/${req.file.filename}`
            })
            await newBlog.save()
        } else {
            const newBlog = new Blog({
                ...req.body,
                user : req.body.userId,
            })
            await newBlog.save()
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: 'successfully',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}
exports.updateBlog=async(req,res,next)=>{

    try {
        const blog = await Blog.findById(req.params.id)

        const fields = {
            title: req.body.title,
            description: req.body.description,
        }
        let data
        if (!req.file) {
            data = await Blog.findByIdAndUpdate(req.params.id, {
                $set: {
                    ...fields
                }
            }, {
                new: true
            })
        } else {
            if (blog.image == '/image/blog/blog_default.png') {
                data = await Blog.findByIdAndUpdate(req.params.id, {
                    $set: {
                        ...fields,
                        image: `/image/blog/${req.file.filename}`
                    }
                }, {
                    new: true
                })

            } else {
                const filepath = path.dirname(__dirname) + "/public" + blog.image;
                fs.unlinkSync(filepath, async (err) => {
                    if(err){
                        console.log('delete image failed')
                    }
                })
                data = await Blog.findByIdAndUpdate(req.params.id, {
                    $set: {
                        ...fields,
                        image: `/image/blog/${req.file.filename}`
                    }
                }, {
                    new: true
                })
            }
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            data: data
        });

    } catch (error) {
        const filepath = path.dirname(__dirname) + "/public/image/blog/" + req.file.filename;
        fs.unlinkSync(filepath, async (err) => {
            if(err){
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: error.message,
                });
            }
        })
    }
}
exports.deleteBlog=async(req,res,next)=>{
    try {
        const blog = await Blog.findById(req.params.id)
        await Blog.findByIdAndDelete(req.params.id)
        if(blog.image !== '/image/blog/blog_default.png'){
            const filepath = path.dirname(__dirname) + "/public" + blog.image;
            fs.unlinkSync(filepath, async (err) => {
                if(err){
                    console.log('delete image failed')
                }
            })
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}
exports.getBlog=async(req,res,next)=>{
    try {
        const data = await Blog.findByIdAndUpdate(req.params.id,{
            $inc : {
                views : 1
            }
        },{
            new : true
        }).populate('user' , 'name image')
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}
exports.getBlogs=async(req,res,next)=>{
    try {
        const data = await Blog.find({}).populate('user' , '-_id name').sort({createdAt : -1})
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            data : data
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}