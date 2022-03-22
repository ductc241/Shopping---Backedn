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


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    cart: {
        type: [CartItemSchema],
        default: []
    },
    role: {
        type: String,
        default: 'MEMBER'
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User