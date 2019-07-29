const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product');

//add a new product
router.post('/', productCtrl.createProduct);

//get all the products
router.get('/', productCtrl.getAllProduct);

//get a single product
router.get('/:id', productCtrl.getProductById);

//update a product
router.put('/:id', productCtrl.updateProduct);

//delete a product
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;