const Order = require("../models/orderModel");
const Products = require("../models/productModel");


const orderCtr = {
    get: async (req, res) => {
        const order = await Order.find().populate(
            'products.product',
            ['title']
        )

        return res.json(order)
    },

    create: async (req, res) => {
        try {
            const { cart, userId } = req.body
      
            const productsId = cart.map(item => item.product)
            const data = await Products.find({_id: { $in: productsId}}, {
                _id: 0,
                price: 1
            })
           
            const newCart = cart.map((item, index) => {
                const { price } = data[index]
                return {...item, price}
            })

            const total = caculateTotalOrder(newCart)

            const newOrder = new Order({
                products: newCart,
                user: userId,
                total: total
            })
            const orderDoc = await newOrder.save()
      
            return res.status(200).json({
                success: true,
                msg : 'Create order success',
                order: orderDoc
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errCode: 1,
                errorMessage: 'Server Error'
            })
        }
    },

    getUserOrders: async (req, res) => {
        const user = req.user
        
        try {
            const orderList = await  Order.find({
                user: user.id
            })
            res.json(orderList)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errCode: 1,
                errorMessage: 'Server Error'
            })
        }
    }
}

const caculateTotalOrder = (products) => {
    const total = products.reduce((total, product) => {
        return total + (product.price * product.quantity)
    }, 0)

    return total
}


module.exports = orderCtr