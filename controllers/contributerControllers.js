const Contributer = require("../models/Contributer");
const fs = require('fs')
const path = require('path')

exports.addContributer = async (req, res, next) => {
    try {
        if (req.file) {
            const contributer = new Contributer({
                ...req.body,
                image: `/image/contribute/${req.file.filename}`
            })
            await contributer.save()
        } else {
            const contributer = new Contributer({
                ...req.body
            })
            await contributer.save()
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

exports.updateContributer = async (req, res, next) => {
    try {
        const user = await Contributer.findById(req.params.id)

        const fields = {
            contributerType: req.body.contributerType,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            designation: req.body.designation,
            facebook: req.body.facebook,
            facebookGroup: req.body.facebookGroup,
        }
        let data
        if (!req.file) {
            data = await Contributer.findByIdAndUpdate(req.params.id, {
                $set: {
                    ...fields
                }
            }, {
                new: true
            })
        } else {
            if (user.image == '/image/users/default_profile.jpg') {
                data = await Contributer.findByIdAndUpdate(req.params.id, {
                    $set: {
                        ...fields,
                        image: `/image/contribute/${req.file.filename}`
                    }
                }, {
                    new: true
                })

            } else {
                const filepath = path.dirname(__dirname) + "/public" + user.image;
                fs.unlinkSync(filepath, async (err) => {
                    if(err){
                        console.log('delete image failed')
                    }
                })
                data = await Contributer.findByIdAndUpdate(req.params.id, {
                    $set: {
                        ...fields,
                        image: `/image/contribute/${req.file.filename}`
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
        const filepath = path.dirname(__dirname) + "/public/image/contribute/" + req.file.filename;
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

exports.deleteContributer = async (req, res, next) => {
    try {
        const contributer = await Contributer.findById(req.params.id)
        await Contributer.findByIdAndDelete(req.params.id)
        if(contributer.image !== '/image/users/default_profile.png'){
            const filepath = path.dirname(__dirname) + "/public" + contributer.image;
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

exports.getContributer = async (req, res, next) => {
    try {
        const data = await Contributer.findById(req.params.id)
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

exports.getAllContributers = async (req, res, next) => {
    try {
        const partners = await Contributer.find({
            contributerType: req.query.q
        })
        res.status(200).json({
            status: 200,
            success: true,
            message: '',
            data: partners
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}