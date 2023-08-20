const { updateBlog, createBlog, deleteBlog, getBlog, getBlogs } = require('../controllers/blogControllers')
const authenticated = require('../middlewares/authenticated')
const {uploadBlog} = require('../middlewares/upload')


const router = require('express').Router()

router.post('/',uploadBlog.single('file'),authenticated, createBlog)
    .put('/:id',uploadBlog.single('file'), authenticated,updateBlog)
    .delete('/:id',authenticated,deleteBlog)
    .get('/:id',getBlog)
    .get('/',getBlogs)
module.exports = router