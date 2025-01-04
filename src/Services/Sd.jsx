// src/Sd.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sd.css'; // Import CSS for styling
import logoImg from '../assets/slogo.png';
const Sd = () => {
    return (
        <div>
        <div className="technicians-images-container21">
                      <img src={logoImg} alt="School Logo" className="technicians-logo21" /></div>
        <div className="sd-container">
             
            <h1>Welcome to the Form Navigation</h1>
            <div className="sd-button-container">
                <Link to="/CartTable" className="sd-button">Go to CartTable</Link>
                <Link to="/Transaction_Dtl" className="sd-button">Go to TransactionDtl</Link>
                <Link to="/Technician_Dtl" className="sd-button">Go to TechnicianDtl</Link>
                <Link to="/TechSkill" className="sd-button">Go to TechSkill</Link>
                <Link to="/TechAvailability" className="sd-button">Go to TechAvailability</Link>
            </div>
        </div></div>
    );
};

export default Sd;
