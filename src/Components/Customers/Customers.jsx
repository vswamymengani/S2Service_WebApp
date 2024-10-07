import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from './cusdeta (1).png';
import logoImg from './slogo.png'; // School logo image
import schoolLogoImg from './slogo.png'; // Additional school logo image
import './Customers.css';
import img2 from './call (1).png'

const Customers = () => {
  const [studentCount, setStudentCount] = useState(0);
  const navigate = useNavigate();

  // Handler function for navigating to the student component
  const handleCdClick = () => {
    navigate('/Cd');
  };

  const handleNewCardClick = () => {
    navigate('/student');
  };

  useEffect(() => {
    axios.get('http://localhost:3000/s2customer')
      .then(response => setStudentCount(response.data.Student_Count))
      .catch(error => console.error('Error fetching student count:', error));
  }, []);

  return (
    <div className="customers-wrapper">
      {/* Centered title */}
      <h1 className="customers-title">Customer</h1>
      
      {/* Container for school images */}
      <div className="customers-images-container">
        <img src={logoImg} alt="School Logo" className="school-logo" />
        {/* <img src={schoolLogoImg} alt="School Logo" className="school-logo-alt" /> */}
      </div>

      {/* Single card for customers */}
      <div className="customers-card-container">
        <div className="customers-card" onClick={handleCdClick}>
          <img src={img1} alt="Customers" className="customers-img" />
          <h3 className="customers-card-title">Customer Details</h3>
        </div>
         {/* New Card beside the existing one */}
       <div className="customers-card" onClick={handleNewCardClick}>
          <img src={img2} alt="New Feature" className="customers-img" />
          <h3 className="customers-card-title">Customer Bookings</h3>
        </div>
      </div>

      
    </div>
  );
};

export default Customers;
