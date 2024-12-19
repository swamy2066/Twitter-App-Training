import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function Post() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({
        title: '', description: '', userId: '1'
    });
    const [editPost, setEditPost] = useState(null);
    const [newComment, setNewComment] = useState({
        text: '', userId: '1'
    });
    const [selectedPost, setSelectedPost] = useState(null); // state to store selected post

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/posts`);
                setPosts(response.data);
            } catch (err) {
                setError('Failed to fetch posts');
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`${BASE_URL}/comments?postId=${postId}`);
            setComments(response.data);
        } catch (err) {
            setError('Failed to fetch comments');
            console.error(err);
        }
    };

    const handleCreatePost = async () => {
        const now = new Date().toISOString();
        try {
            const response = await axios.post(`${BASE_URL}/posts`, {
                ...newPost,
                createdAt: now,
                updatedAt: now,
            });
            setPosts([...posts, response.data]);
            setNewPost({ title: '', description: '', userId: '1' });
        } catch (err) {
            setError('Failed to create post');
            console.error(err);
        }
    };

    const handleUpdatePost = async () => {
        if (!editPost) return;
        const updatedPost = {
            ...editPost,
            updatedAt: new Date().toISOString(),
        };
        try {
            const response = await axios.put(`${BASE_URL}/posts/${editPost.id}`, updatedPost);
            setPosts(posts.map(post => post.id === editPost.id ? response.data : post));
            setEditPost(null);
        } catch (err) {
            setError('Failed to update post');
            console.error(err);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`${BASE_URL}/posts/${postId}`);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (err) {
            setError('Failed to delete post');
            console.error(err);
        }
    };

    const handleCreateComment = async (postId) => {
        if (!newComment.text) {
            setError('Comment is required');
            return;
        }
        const now = new Date().toISOString();
        try {
            const response = await axios.post(`${BASE_URL}/comments?postId=${postId}`, {
                ...newComment,
                createdAt: now,
                updatedAt: now,
            });
            fetchComments(postId);
            setNewComment({ text: '', userId: '1' });
        } catch (err) {
            setError('Failed to create comment');
            console.error(err);
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        try {
            await axios.delete(`${BASE_URL}/comments/${commentId}?postId=${postId}`);
            fetchComments(postId);
        } catch (err) {
            setError('Failed to delete comment');
            console.error(err);
        }
    };

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        if (editPost) {
            setEditPost({ ...editPost, [name]: value });
        } else {
            setNewPost({ ...newPost, [name]: value });
        }
    };

    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setNewComment(prev => ({ ...prev, [name]: value }));
    };

    const handleViewComments = (post) => {
        setSelectedPost(post); 
        fetchComments(post.id); 
    };

    return (
        <div>
            {error && <div>{error}</div>}

            <div>
                <h3>Create Post</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newPost.title}
                    onChange={handlePostChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newPost.description}
                    onChange={handlePostChange}
                />
                <button onClick={handleCreatePost}>Create</button>
            </div>

            {editPost && (
                <div>
                    <h3>Edit Post</h3>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={editPost.title}
                        onChange={handlePostChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={editPost.description}
                        onChange={handlePostChange}
                    />
                    <button onClick={handleUpdatePost}>Update</button>
                </div>
            )}

            {posts.length > 0 ? (
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.description}</td>
                                <td>{new Date(post.createdAt).toLocaleString()}</td>
                                <td>{new Date(post.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => setEditPost(post)}>Edit</button>
                                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                                    <button onClick={() => handleViewComments(post)}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No posts available</div>
            )}


            {selectedPost && (
                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                        <h3>Post Details</h3>
                        <div>
                            <p><strong>ID:</strong> {selectedPost.id}</p>
                            <p><strong>Title:</strong> {selectedPost.title}</p>
                            <p><strong>Description:</strong> {selectedPost.description}</p>
                            <p><strong>Created At:</strong> {new Date(selectedPost.createdAt).toLocaleString()}</p>
                            <p><strong>Updated At:</strong> {new Date(selectedPost.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <h3>View Comments</h3>
                        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Comments</th>
                                    <th>User ID</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment) => (
                                    <tr key={comment.id}>
                                        <td>{comment.text}</td>
                                        <td>{comment.userId}</td>
                                        <td>{new Date(comment.createdAt).toLocaleString()}</td>
                                        <td>
                                            <button onClick={() => handleDeleteComment(selectedPost.id, comment.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div>
                            <h3>Create Comment</h3>
                            <input
                                type="text"
                                name="text"
                                placeholder="Enter your comment"
                                value={newComment.text}
                                onChange={handleCommentChange}
                            />
                            <button onClick={() => handleCreateComment(selectedPost.id)}>Create Comment</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;
