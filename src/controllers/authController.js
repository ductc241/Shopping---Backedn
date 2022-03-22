const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const authCtr = {
    register: async (req, res ) => {
        try {
            const { username, password, displayName } = req.body

            if(!username) return res.status(400).json({
                msg: 'You must enter your username'
            })

            if(!password) return res.status(400).json({
                msg: 'You must enter your password'
            })

            if(!displayName) return res.status(400).json({
                msg: 'You must enter your display name'
            })

            const existingUser = await User.findOne({ username });
            if(existingUser) return res.status(400).json({
                msg: 'That email address is already in use'
            })

            const user = new User({
                username,
                password,
                displayName
            });

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);

            user.password = hash;
            const registeredUser = await user.save();

            res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                user: {
                    username: registeredUser.username,
                    display: registeredUser.displayName,
                    role: registeredUser.role
                }
            });

        } catch (error) {
            res.status(500).json({
                errCode: 1,
                errMessage: `Server Error: ${error.message}`
            });
        }
    },


    login: async (req, res) => {
        const { username, password } = req.body

        if(!username || !password) return res.status(400).json({
            errCode: 1,
            errMessage: 'Please enter both your username and password',
        })

        const user = await User.findOne({ username })
        if(!user) return res.status(400).json({
            errCode: 1,
            errMessage: 'Cant find user for this username',
        })

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({
            errCode: 1,
            errMessage: 'Password Incorrect'
        })

        const token = jwt.sign(
            {id: user._id},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' },
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60*60*1000,
            sameSite: 'none',
            secure: true
        })

        res.status(200).json({
            success: true,
            token: token,
            user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                role: user.role
            }
        });
    }
}

module.exports = authCtr