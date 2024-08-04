const {createPost , getPosts } = require('../models/PostModel');
const {addComment, getComments} = require('../models/CommentModel');

const createNewPost = async (req, res) => {
    try{
    console.log( "create new Post controller : ", req.body , req.user.id);
    const {title , content } = req.body;
    const userId = req.user.id;
    await createPost(userId, title , content);
    console.log("New post created");
    res.status(200).json({message : "new post created"});
    }
    catch(err){
        console.error("Error in blogController : ", err);
        res.status(500).json({message : "Blogcontorller"});
    };
};

const fetchPosts = async (req, res) => {
    try{
        const posts = await getPosts();
        res.status(200).json(posts);
        console.log("Fteched posts");
    }
    catch(err){
        console.error("Error in fetchPosts : ", err);
        res.status(500).json({message : "Error fetching posts"});
    }
};

const createComment = async (req, res) => {
    try {
        console.log("createComment req : ", req.body , req.user.id);
        const { postId, content } = req.body;
        const userId = req.user.id;
        await addComment(userId, postId, content);
        res.status(200).json({ message: 'Comment added successfully' });
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: 'Error adding comment' });
    }
};

const fetchComments = async (req, res) => {
        try{
        console.log('req.body of fetchComments : ', req.body);
        const  postId  = req.params;
        const comments = await getComments(postId);
        res.status(200).json(comments);
        }
        catch(err){
        console.error('Error fetching comments:', err);
        res.status(500).json({ message: 'Error fetching comments' });
        }
};

module.exports = { createNewPost, fetchPosts, createComment, fetchComments };