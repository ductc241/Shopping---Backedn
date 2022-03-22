const mongoose = require('mongoose')
const { Schema } = mongoose

const CartItemSchema = new Schema({
	product: {
	  type: Schema.Types.ObjectId,
	  ref: 'Product'
	},
	quantity: {
		type: Number
	},
    price: {
        type: Number
    }
});

const orderSchema = new Schema({
    products: {
        type: [CartItemSchema],
        default: []
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'In processing'
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);
module.exports =Order