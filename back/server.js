const express = require('express');
const connectDB = require('./config/db');
const app = express()
const cors = require('cors')
const bodyparser =require('body-parser')
//Connect To MongoDB
connectDB()

app.get('/' , (req,res)=>{
    res.send('API Running')
})

//Use Middleware
app.use(express.json({extended:false}))
app.use(cors())
app.use('/public',express.static('./public'))
app.use(bodyparser.json())
//API Routes
app.use('/api/auth' , require('./routes/api/auth'))
app.use('/api/users' , require('./routes/api/users'))
app.use('/api/categories' , require('./routes/api/categories'))
app.use('/api/subcategories' , require('./routes/api/subcategory'))
app.use('/api/products' , require('./routes/api/products'))
app.use('/api/country' , require('./routes/api/country'))
app.use('/api/city' , require('./routes/api/city'))
app.use('/api/region' , require('./routes/api/region'))
app.use('/api/blogs' , require('./routes/api/blog'))
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/order-item', require('./routes/api/orderItem'));
app.use('/api/offers', require('./routes/api/offers'));
app.use('/api/rates', require('./routes/api/rates'));

//App listen on Port 4000
const PORT = process.env.PORT || 4000
app.listen(PORT , ()=>{
    console.log(`Server Run on Port 4000`);
})