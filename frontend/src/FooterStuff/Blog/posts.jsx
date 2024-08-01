import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(`/api/posts/${postId}/like`);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      await axios.post(`/api/posts/${postId}/comments`, { comment });
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      ));
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <img src={`/uploads/${post.image}`} alt={post.title} />
          <p>{post.body}</p>
          <div>
            <button onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
          </div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
          </div>
          <div>
            <h4>Comments:</h4>
            {post.comments.map((c, index) => (
              <p key={index}>{c}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
