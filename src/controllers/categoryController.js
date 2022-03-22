const Category = require('../models/categoryModel')

const categoryCtr = {
	getCategories: async(req, res) => {
		const categories = await Category.find()

		return res.status(200).json(categories)
	},

	getCategorySelect: async(req, res) => {
		try {
			const categories = await Category.find().select('name')
			return res.status(200).json(categories)
		} catch (error) {
			res.status(500).json({ msg: 'Server error'})
		}
	},

	addCategory: async(req, res) => {
		const { name } = req.body

		if(!name) return res.status(400).json({
			msg: 'Category name is required'
		})

		const newCategory = new Category({
			name: name
		})

		await newCategory.save()
		return res.status(201).json({
			msg: 'Create success new category'
		})
	}
}

module.exports = categoryCtr