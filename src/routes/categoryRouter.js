const express = require('express')
const categoryCtr =  require('../controllers/categoryController')

const router = express.Router()

router.get('/category', categoryCtr.getCategories)
router.get('/category/select', categoryCtr.getCategorySelect)

router.post('/category', categoryCtr.addCategory)

module.exports =  router;