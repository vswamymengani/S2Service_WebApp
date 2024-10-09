import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from './cusdeta (1).png';
import logoImg from './slogo.png'; // School logo image
import img2 from './call (1).png';
import './Customers.css';

const Customers = () => {
  // State to store the customer count
  const [customerCount, setCustomerCount] = useState(0);
  const navigate = useNavigate();

  // Handler function for navigating to the customer details component
  const handleCdClick = () => {
    navigate('/Cd');
  };

  // Handler function for navigating to the student component
  const handleNewCardClick = () => {
    navigate('/student');
  };

  // Function to fetch the customer count
  const fetchCustomerCount = async () => {
    try {
      // API call to get customer count
      const response = await axios.get('http://localhost:3000/CustomerCount');
      setCustomerCount(response.data.customerCount); // Set the customer count from the response
    } catch (error) {
      console.error('Error fetching customer count:', error);
    }
  };

  // Fetch customer count when the component mounts
  useEffect(() => {
    fetchCustomerCount();
  }, []);

  return (
    <div className="customers-wrapper">
      {/* Centered title */}
      <h1 className="customers-title">Customer</h1>

      {/* Container for school images */}
      <div className="customers-images-container">
        <img src={logoImg} alt="School Logo" className="school-logo" />
      </div>

      {/* Single card for customers */}
      <div className="customers-card-container">
        {/* Customer Details Card */}
        <div className="customers-card" onClick={handleCdClick}>
          <img src={img1} alt="Customers" className="customers-img" />
          <h3 className="customers-card-title">Customer Details</h3>
          {/* Display the customer count dynamically */}
          <h3 className="customers-card-title">Total {customerCount} Customers</h3>
        </div>

        {/* Customer Bookings Card */}
        <div className="customers-card" onClick={handleNewCardClick}>
          <img src={img2} alt="New Feature" className="customers-img" />
          <h3 className="customers-card-title">Customer Bookings</h3>
        </div>
      </div>
    </div>
  );
};

export default Customers;
