// src/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home1.css'; // Import CSS for styling

const Home = () => {
    return (
        <div className="home-containerr">
            <h1>Welcome to the Form Navigation</h1>
            <div className="button-containerr">
                <Link to="/S2sCategoriesForm" className="buttonr">Go to Categories Form</Link>
                <Link to="/S2sSubcategoriesForm" className="buttonr">Go to Subcategories Form</Link>
                <Link to="/S2sServicesForm" className="buttonr">Go to Services Form</Link>
            </div>
        </div>
    );
};

export default Home;
