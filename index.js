const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.route.js')
const userRoutes = require('./routes/user.route.js')
const productRoute = require('./routes/product.render.route.js');

const methodOverride = require('method-override');

const cookieParser = require('cookie-parser');

const app = express()
// app.use(expressLayouts)
app.use(express.static('public'))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on Server is running at http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}, ID: ${req.params.id}`);
    next();
});

//routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/', productRoute)

//views
app.set('view engine', 'ejs');
app.set('views', './views');
// app.set('layout', 'layouts/main');

//connect to database
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to Database')
    }).catch((err) => {
        console.log('Connected Failed:', err.message)
    })