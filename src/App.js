import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { ToastContainer } from 'react-toastify';
import Post from './Components/Post';
import UserProfile from './Components/UserProfile';
import Comments from './Components/Comments';
 

function App() {

  return (
    <div className='App'>
       <ToastContainer theme='colored'></ToastContainer>
       <Navbar />
       <Routes>
          <Route path="/" element={ <Home />} />
          <Route path='/register' element={ <Register />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/post' element={ <Post />} />
          <Route path='/comments' element={ <Comments />} />
          <Route path='/userprofile' element={ <UserProfile />} />
       </Routes>
    </div>
  )
}

export default App
