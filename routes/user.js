const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//add a new user
router.post('/singup', userCtrl.singup);

//get all the users
router.get('/', userCtrl.getAllUser);

//login
router.post('/login', userCtrl.login);

//update a user
router.put('/:id', userCtrl.updateUser);

//delete a user
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;