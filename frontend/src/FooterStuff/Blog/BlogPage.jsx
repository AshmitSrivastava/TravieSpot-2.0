import React, {useState  , useEffect} from "react";
import axios from "axios";
import Post from "./Post";
import NewPost from "./NewPost";
import NewComment from "./NewComment";

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {
        fetchPosts();
        checkAuthentication();
    }, []);

    const fetchPosts = async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/blog/posts');
            console.log( "response.data of fetchPOsts : ", response.data);
            setPosts(response.data);
        }

        catch(err){
            console.error("Error in fetching posts : ",err);
        }
    };

    const checkAuthentication = async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/auth/protected');
            console.log(response.data);
            setisAuthenticated(response.data.isAuthenticated);
        }
        catch(err){
            console.error("Error in checkAuth in Blog Page : ", err);
        }
    };

    return (
        <div>
            <h1>Blog</h1>
            {isAuthenticated && <NewPost refreshPosts={fetchPosts} />}
            <div>
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))} 
            </div>
        </div>
    );
};

export default BlogPage;
