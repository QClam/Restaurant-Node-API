const express = require('express')
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.route.js')
const userRoutes = require('./routes/user.route.js')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log(`Server is running on Server is running at http://localhost:3000`)
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

//routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


//connect to database
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to Database')
    }).catch((err) => {
        console.log('Connected Failed:', err.message)
    })