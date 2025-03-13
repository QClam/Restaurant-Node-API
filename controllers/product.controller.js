const Product = require('../models/product.model.js')
const mongoose = require('mongoose');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create((req.body))
        res.status(201).json({ product })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json({ updatedProduct })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const purchaseProduct = async (req, res) => {
    try {
        const { id, purchaseQuantity } = req.body;
        // console.log("Received Body:", req.body);

        // Kiểm tra ID có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Kiểm tra hàng tồn kho
        if (product.quantity < purchaseQuantity) {
            return res.status(400).json({ message: 'Product out of stock' });
        }

        // Cập nhật số lượng sản phẩm
        product.quantity -= purchaseQuantity;
        await product.save();

        res.status(201).json({ product });
    } catch (error) {
        console.error("Purchase Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    purchaseProduct,
    deleteProduct
}