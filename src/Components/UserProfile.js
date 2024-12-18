

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {new Date(user.dob).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;
