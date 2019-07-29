const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//add a new user
router.post('/', userCtrl.createUser);

//get all the users
router.get('/', userCtrl.getAllUser);

//get a single user
router.get('/:id', userCtrl.getUserById);

//update a user
router.put('/:id', userCtrl.updateUser);

//delete a user
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;