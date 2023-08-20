const multer = require('multer')

const userStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/image/users')
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now()+file.originalname.toLowerCase().split(' ').join('-')
        cb(null,fileName)
    }
})

const contributeStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/image/contribute')
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now()+file.originalname.toLowerCase().split(' ').join('-')
        cb(null,fileName)
    }
})

const blogStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/image/blog')
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now()+file.originalname.toLowerCase().split(' ').join('-')
        cb(null,fileName)
    }
})

exports.uploadUser = multer({
    storage: userStorage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error('Invalid file type. Only jpg.jepg and png are allowed.'));
        }
    }
})



exports.uploadContribute = multer({
    storage: contributeStorage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error('Invalid file type. Only jpg.jepg and png are allowed.'));
        }
    }
})

exports.uploadBlog = multer({
    storage: blogStorage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error('Invalid file type. Only jpg.jepg and png are allowed.'));
        }
    }
})