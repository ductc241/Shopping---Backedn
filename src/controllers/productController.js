const APIfeatures = require("../lib/features");
const CartItem = require("../models/cartItemModel");
const Products = require("../models/productModel");


const productCtr = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Products.find().populate('categoryId', 'name'),
        req.query
      ).paginating().sorting().searching().filtering()

      const result = await Promise.allSettled([
        features.query,
        Products.countDocuments() //count number of products.
      ])
      
      const products = result[0].status === 'fulfilled' ? result[0].value : [];
      const count = result[1].status === 'fulfilled' ? result[1].value : 0;

      return res.status(200).json({products, count})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },

  getProduct: async(req, res) => {
    try {
      const product = await Products
        .findById(req.params.id)
        .populate('categoryId', 'name') //select only category name

      if(!product) 
        return res.status(404).json({msg: 'This product does not exist.'})

      return res.status(200).json(product)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },

  getProductsByCategory: async(req, res) => {
    try {
      const { categoryId } = req.body
      const products = await Products.find({
        categoryId: categoryId
      }).populate('categoryId', 'name')

      res.json(products)
    } catch(e) {
      // statements
      return res.status(500).json({msg: err.message})
    }
  },

  addProduct: async (req, res) => {
    try {
      const { title, price, description, image, categoryId } = req.body;

      const newProduct = new Products({
        title, price, description, image, categoryId
      })
      await newProduct.save()

      return res.status(200).json(newProduct)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { title, price, description, category, image } = req.body;
      
      const product = await Products.findByIdAndUpdate(req.params.id, {
        title, price, description, category, image
      }, { new: true })

      if(!product) 
        return res.status(404).json({msg: 'This product does not exist.'})

      return res.status(200).json(product)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },

  deleteProduct: async (req, res) => {
    try {      
      const product = await Products.findByIdAndDelete(req.params.id)

      if(!product) 
        return res.status(404).json({msg: 'This product does not exist.'})

      return res.status(200).json({msg: 'Delete Success!'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },


  findArray: async (req, res) => {
    try {
      const cart = [
        {
          product: '6230cc7db14770d1d57781f8',
          quantity: 1
        },
        {
          product: '6230c738b14770d1d57781eb',
          quantity: 2
        }
      ]

      const productsId = cart.map(item => item.product)
      const data = await Products.find({_id: { $in: productsId}}, {_id: 0, price: 1})


      const newCart = cart.map((item, index) => {
        const { price } = data[index]
        return {...item, price}
      })

      return res.status(200).json(newCart)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'erroe'
      })
    }
  }
}

module.exports = productCtr
