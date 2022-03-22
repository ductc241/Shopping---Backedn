const express = require('express')
const orderCtr = require('../controllers/orderController')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/order', orderCtr.get)
router.get('/order/user', auth, orderCtr.getUserOrders)

router.post('/order', orderCtr.create)


module.exports =  router;