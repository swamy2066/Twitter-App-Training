import React from 'react';
import './Home.css';  // Importing the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Home Page!</h1>
        <p>Enjoy your stay and explore the features.</p>
      </header>
      <section className="content">
        <h2>Our Services</h2>
        <p>We provide innovative solutions to help you grow and succeed.</p>
        <button className="cta-button">Register Now</button>
      </section>
    </div>
  );
};

export default Home;
