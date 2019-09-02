const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const productCtrl = require('../controllers/product');

//add a new product
router.post('/', auth, productCtrl.createProduct);

//get all the products
router.get('/', productCtrl.getAllProduct);

//get a single product
router.get('/:id', auth, productCtrl.getProductById);

//update a product
router.put('/:id', auth, productCtrl.updateProduct);

//delete a product
router.delete('/:id', auth, productCtrl.deleteProduct);

module.exports = router;