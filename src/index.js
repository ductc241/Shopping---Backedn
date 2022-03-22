require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const routes = require('./routes');


const app = express()

// middleware
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['https://shopping-woad-beta.vercel.app', 'http://localhost:3000'],
}));
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
}));

// routes
routes(app)

// database
const URI = process.env.MONGO_ATLAS_URL
mongoose.connect(URI, (err) => {
    if(err) throw err
    console.log('Mongodb connection')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT)
})