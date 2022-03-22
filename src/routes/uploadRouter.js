const router = require("express").Router()
const cloudinary = require("../lib/cloudinary")
const fs = require('fs')

router.post('/upload', (req, res) => {
    try {
        const file = req.files.file

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "Shop"}, async(err, result)=>{
            if(err) throw err;

            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.massage })
    }
})

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}


module.exports = router