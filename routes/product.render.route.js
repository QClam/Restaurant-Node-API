const express = require('express');
const router = express.Router();
const { getProducts, getProductForm, addProduct, updateProduct, getUpdateProductForm, deleteProduct } = require('../controllers/product.render.controller.js');

router.get('/home', getProducts);
router.get('/add-product', getProductForm);
router.post('/product/add', addProduct)
router.get('/product/update/:id', getUpdateProductForm)
router.put('/product/update/:id', updateProduct)
router.delete('/product/delete/:id', deleteProduct)

module.exports = router;