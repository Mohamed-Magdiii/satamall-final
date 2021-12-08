const mongoose = require('mongoose')
// const config  = require('config')
const dotenv = require('dotenv')
dotenv.config()
const connectDB  = ()=>{
    try {
        mongoose.connect(process.env.mongoURI, {
            useNewUrlParser:true,
        })
        console.log("mongo connect...");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB