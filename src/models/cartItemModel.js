const mongoose = require('mongoose')
const { Schema } = mongoose

const CartItemSchema = new Schema({
	product: {
	  type: Schema.Types.ObjectId,
	  ref: 'Product'
	},
	quantity: {
		type: Number
	}
});

const CartItem = mongoose.model('CartItem', CartItemSchema);
module.exports = CartItem
