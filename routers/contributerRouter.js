const { addContributer, updateContributer, deleteContributer, getContributer, getAllContributers } = require('../controllers/contributerControllers')
const authenticated = require('../middlewares/authenticated')
const { uploadContribute } = require('../middlewares/upload')

const router = require('express').Router()

router.post('/',authenticated,uploadContribute.single('file'), addContributer)
    .put('/:id', authenticated,uploadContribute.single('file'),updateContributer)
    .delete('/:id',authenticated,deleteContributer)
    .get('/:id',authenticated,getContributer)
    .get('/',getAllContributers)
module.exports = router