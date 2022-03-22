const User = require("../models/userModel");

const userCtr = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().populate(
                'cart.product',
                ['title', 'price']
            )

            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({
                errCode: 1,
                errMessage: 'Server Error'
            })
        }
    },

    updateUser: async (req, res) => {
        const userId = req.params.id
        const userInfor = req.body

        try {
            const userDoc = await User.findOneAndUpdate({ _id: userId }, userInfor, {
                new: true
            });

            res.status(200).json({
                user: userDoc
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: 'server error'
            })
        }
    },

    // findById

    // get user by cookei
    getInfor: async (req, res) => {
        try {
            const { id } = req.user
            const userInfor = await User.findById(id, {
                password: 0
            })

            res.status(200).json(userInfor)
        } catch (error) {
            res.status(500).json({
                errCode: 1,
                errMessage: 'Server Error'
            })
        }
    }

    // updateCart
    // clearCart
}

module.exports = userCtr