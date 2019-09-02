const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const blogpostCtrl = require('../controllers/blogPost');

//add a new blogpost
router.post('/', blogpostCtrl.createPost);

//get all the blogposts
router.get('/', blogpostCtrl.getAllPost);

//get post by author
router.get('/:author', blogpostCtrl.getPostByAuthor);

//get post by type
router.get('/:type', blogpostCtrl.getPostByType);

//update a blogpost
router.put('/:id', blogpostCtrl.updatePost);

//delete a blogpost
router.delete('/:id', blogpostCtrl.deletePost);

module.exports = router;