const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        default: '/image/users/default_profile.png'
    },
    gender: {
        type: String,
        enum: ['পুরুষ', 'মহিলা', 'অন্যান্য'],
    },
    dob: {
        type: Date,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required : true
    },
    platelet: {
        type: Boolean,
        default : false
    },
    lastDonate: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    presentDivision: {
        type: String,
        required: true,
    },
    presentDistrict: {
        type: String,
        required: true,
    },
    presentUpazila: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    parmanentDivision: {
        type: String,
        required: true,
    },
    parmanentDistrict: {
        type: String,
        required: true,
    },
    parmanentUpazila: {
        type: String,
        required: true,
    },
    parmanentAddress: {
        type: String,
        required: true,
    },
    
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User