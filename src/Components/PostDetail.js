import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const BASE_URL = 'http://localhost:5000';

const PostDetail = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
        const id = 1;
        try {
            const response = await axios.get(`${BASE_URL}/posts/${id}`);
            setPost(response.data); 
        } catch (err) {
            setError('Failed to fetch posts');
            console.error(err);
            
        }
    };

    fetchPosts();
    
}, []);



  return (
    <div>
    {error && <div>{error}</div>}

    {post.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>User ID</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                </tr>
            </thead>
            <tbody>
                {post.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td>{post.userId}</td>
                        <td>{new Date(post.createdAt).toLocaleString()}</td>
                        <td>{new Date(post.updatedAt).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <div>No posts available</div>
    )}
</div>
  );
};

export default PostDetail;
