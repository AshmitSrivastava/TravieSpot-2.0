const express = require('express');
const router = express.Router();
const {createNewPost , fetchPosts , createComment , fetchComments} = require('../controllers/blogController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/posts', authenticate , createNewPost);
router.get('/posts', fetchPosts);
router.post('/comments', createComment);
router.get('/post/:postId/comments', fetchComments);

module.exports = router;