const express = require('express')
const productCtr =  require('../controllers/productController')

const router = express.Router()

router.get('/products', productCtr.getProducts)
router.get('/products/category', productCtr.getProductsByCategory)

router.post('/products', productCtr.addProduct)

router.get('/products/all', productCtr.findArray)

router.get('/products/:id', productCtr.getProduct)
router.put('/products/:id', productCtr.updateProduct)
router.delete('/products/:id', productCtr.deleteProduct)





module.exports =  router;