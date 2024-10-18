// src/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home1.css'; // Import CSS for styling

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Form Navigation</h1>
            <div className="button-container">
                <Link to="/S2sCategoriesForm" className="button">Go to Categories Form</Link>
                <Link to="/S2sSubcategoriesForm" className="button">Go to Subcategories Form</Link>
                <Link to="/S2sServicesForm" className="button">Go to Services Form</Link>
            </div>
        </div>
    );
};

export default Home;
