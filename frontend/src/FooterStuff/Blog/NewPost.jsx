import axios from "axios";
import React, {useState} from "react";


const NewPost = ({refreshPosts}) => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    const handleSubmit = async () => {
        try{
            await axios.post('http://localhost:3000/api/blog/posts', {title , content});
            setContent('');
            setTitle("");
            refreshPosts();
            alert('Blog Post Created !');
        }
        catch(err){
            console.error("Error in NEwPost : ", err);
        }

    };


return(
    <form onSubmit={handleSubmit}>
        <h1>Make a New Blog Post!</h1>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <button type="submit">Create Post</button>
        </form>
);

};

export default NewPost;