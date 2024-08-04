import React, {useState} from "react";
import axios from "axios";

const NewComment = ({ postId , refreshComments}) => {

    const [content , setContent] = useState('');

    const handleSubmit = async () => {
        
        try{
            console.log({ postId, content});
           await axios.post('http://localhost:3000/api/blog/comments', {postId, content});
           setContent('');
            refreshComments();
        }
        catch(err){
            console.error("Error in newComment : ", err);
        }
    }


return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Comment:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Add Comment</button>
    </form>
);

};


export default NewComment;