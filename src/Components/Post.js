import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function Post() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({ title: '', description: '', userId: '', createdAt: '' });
    const [editPost, setEditPost] = useState({updatedAt: ''});


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


    const handleCreate = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/posts`, newPost);
            setPosts([...posts, response.data]);
            setNewPost({ title: '', description: '', userId: '1', createdAt: '' });
        } catch (err) {
            setError('Failed to create post');
            console.error(err);
        }
    };


    const handleUpdate = async () => {
        if (!editPost) return;
        try {
            const response = await axios.put(`${BASE_URL}/posts/${editPost.id}`, editPost);
            setPosts(posts.map(post => post.id === editPost.id ? response.data : post));
            setEditPost({updatedAt: ''});
        } catch (err) {
            setError('Failed to update post');
            console.error(err);
        }
    };


    const handleDelete = async (postId) => {
        try {
            await axios.delete(`${BASE_URL}/posts/${postId}`);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (err) {
            setError('Failed to delete post');
            console.error(err);
        }
    };


    const handleInputChange = (e, postType) => {
        const { name, value } = e.target;
        if (postType === 'create') {
            setNewPost(prev => ({ ...prev, [name]: value }));
        } else if (postType === 'edit') {
            setEditPost(prev => ({ ...prev, [name]: value }));
        }
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
                    onChange={(e) => handleInputChange(e, 'create')}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newPost.description}
                    onChange={(e) => handleInputChange(e, 'create')}
                />
                <input
                    type="datetime-local"
                    name="createdAt"
                    placeholder="Created At"
                    value={newPost.createdAt}
                    onChange={(e) => handleInputChange(e, 'create')}
                />


                <button onClick={handleCreate}>Create</button>
            </div>

            {editPost && (
                <div>
                    <h3>Edit Post</h3>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={editPost.title}
                        onChange={(e) => handleInputChange(e, 'edit')}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={editPost.description}
                        onChange={(e) => handleInputChange(e, 'edit')}
                    />
                    <input
                        type="number"
                        name="userId"
                        placeholder="User ID"
                        value={editPost.userId}
                        onChange={(e) => handleInputChange(e, 'edit')}
                    />

                    <input
                        type="datetime-local"
                        name="updatedAt"
                        placeholder="Updated At"
                        value={editPost.updatedAt}
                        onChange={(e) => handleInputChange(e, 'create')}
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}

            {posts.length > 0 ? (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>User ID</th>
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
                                <td>{post.userId}</td>
                                <td>{new Date(post.createdAt).toLocaleString()}</td>
                                <td>{new Date(post.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => setEditPost(post)}>Edit</button>
                                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No posts available</div>
            )}
        </div>
    );
}

export default Post;
