const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

const { getProducts, getProductById, createProduct, updateProduct, purchaseProduct, deleteProduct } = require('../controllers/product.controller.js');

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

router.post('/purchase', auth ,purchaseProduct);


module.exports = router;