import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function Comments() {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState({
        text: '',
        userId: '1',
        createdAt: '',
        updatedAt: ''
    });

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/comments`);
                setComments(response.data);
                console.log(response.data); 
            } catch (err) {
                setError('Failed to fetch comments');
                console.error(err);
            }
        };

        fetchComments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateComment = async () => {
        if (!newComment.text) {
            setError('Comment is required');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/comments`, newComment);
            setComments([...comments, response.data]);
            setNewComment({
                text: '',
                userId: '1',
                createdAt: '',
                updatedAt: ''
            });
        } catch (err) {
            setError('Failed to create comment');
            console.error(err);
        }
    };

    return (
        <div>
            <h3>Create Comment</h3>
            <input
                type="text"
                name="text"
                placeholder="Enter your comment"
                value={newComment.text}
                onChange={handleInputChange}
            />
            <input
                type="datetime-local"
                name="createdAt"
                value={newComment.createdAt}
                onChange={handleInputChange}
            />
            <input
                type="datetime-local"
                name="updatedAt"
                value={newComment.updatedAt}
                onChange={handleInputChange}
            />
            <button onClick={handleCreateComment}>Create Comment</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                        <th>User ID</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment) => (
                        <tr key={comment.id}>
                            <td>{comment.id}</td>
                            <td>{comment.text}</td>
                            <td>{comment.userId}</td>
                            <td>{new Date(comment.createdAt).toLocaleString()}</td>
                            <td>{new Date(comment.updatedAt).toLocaleString()}</td>
                            <td>
                                <button onClick={() => alert(`Edit comment ${comment.id}`)}>Edit</button>
                                <button onClick={() => alert(`Delete comment ${comment.id}`)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Comments;
