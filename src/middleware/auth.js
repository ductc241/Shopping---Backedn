const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) return res.status(401).json({msg: 'Invalid Authentication. Please Login !!!'})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json({msg: 'Invalid_Authentication, Please Login !!!'})
            req.user = user

            next()
        })
    } catch (error) {
        // console.log(error)
        res.status(401).json({msg: "Can't access"})
    }
}



module.exports = auth
