// src/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home1.css'; // Import CSS for styling
import logoImg from '../assets/slogo.png';

const Home = () => {
    return (
        <div>
        <div className="technicians-images-container22">
        <img src={logoImg} alt="School Logo" className="technicians-logo22" />
    </div>
        <div className="home-wrapper">
        <h1>Welcome to the Form Navigation</h1>
            <div className="home-containerr">
                
                <div className="button-containerr">
                    <Link to="/S2sCategoriesForm" className="buttonr">Go to Categories Form</Link>
                    <Link to="/S2sSubcategoriesForm" className="buttonr">Go to Subcategories Form</Link>
                    <Link to="/S2sServicesForm" className="buttonr">Go to Services Form</Link>
                </div>
            </div>
        </div></div>
    );
};

export default Home;
