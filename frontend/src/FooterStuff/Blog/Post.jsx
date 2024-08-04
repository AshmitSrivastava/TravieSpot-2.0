import React , {useEffect, useState} from "react";
import Comment from './Comment';
import NewComment from './NewComment';
import axios from 'axios';

const Post = ({post}) => {
    const [comments , setComments] = useState([]);

    useEffect(() => {
       fetchComments();
    }, []);

    const fetchComments = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/blog/post/${post.id}/comments`);
            console.log( 'comments response.data : ' , response.data);
            setComments(response.data);
        }
        catch(error){
            console.error("Error in fetchComments :", error);
        }
    }


return(
    <div>
         <h2>{post.title}</h2>
        <p>{post.comment}</p>
         <p>Posted By : {post.username}</p> 
        <div>
            <h3>Comments</h3>
            <button>Add comment</button> <br />
            <button>See all comments</button>
            {comments.map(comment => {
                <Comment key = {comment.id} comment = {comment}/>
            })}
            <NewComment  postId = {post.id} refreshComments = {fetchComments}/> */
        </div>
    </div>
);

};

export default Post;
