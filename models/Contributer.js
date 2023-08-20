const mongoose = require('mongoose');

const contributerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone : {
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    image: {
        type: String,
        default: '/image/users/default_profile.png'
    },
    address : {
        type: String
    },
    contributerType : {
        type: String,
        enum : ['volantear','partner']
    },
    designation : {
        type: String
    },
    facebook : {
        type: String
    },
    facebookGroup : {
        type: String
    }
},{
    timestamps:true
})

const Contributer = mongoose.model('Contributer',contributerSchema)
module.exports = Contributer