const Product = require('../models/product.model');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.render('home.ejs', {
            products,
            title: 'Danh sách sản phẩm'
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductForm = (req, res) => {
    try {
        res.render('addProduct.ejs', {
            title: 'Thêm sản phẩm'
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const { name, quantity, price } = req.body;
        const newProduct = await Product.create({
            name,
            quantity,
            price
        })

        // console.log("Created Product: ", newProduct)
        res.redirect('/home')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getUpdateProductForm = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if(!product) {
            res.status(404).json({ message: 'Product not found' })
        }
        res.render('updateProduct.ejs', {
            title: 'Cập nhật sản phẩm',
            product
        });
        console.log("Product: ", product);
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            quantity,
            price
        }, { new: true })
        console.log("Updated Product: ", updatedProduct)
        res.redirect('/home')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/home')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getProducts, getProductForm, addProduct, updateProduct, getUpdateProductForm, deleteProduct };
