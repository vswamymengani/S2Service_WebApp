import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from '../assets/web (1).png';
import logoImg from '../assets/slogo.png'; // School logo image
import img2 from '../assets/sercom (2).jpg'; // Placeholder for new feature image
import './Services.css'; // Updated CSS import

const Services = () => {
  const [studentCount, setStudentCount] = useState(0);
  const navigate = useNavigate();

  // Handler function for navigating to the student component
  const handleServiceClick = () => {
    navigate('/sd');
  };

  const handleNewCardClick = () => {
    navigate('/Home1');
  };

  useEffect(() => {
    axios.get('http://localhost:3000/s2customer')
      .then(response => setStudentCount(response.data.Student_Count))
      .catch(error => console.error('Error fetching student count:', error));
  }, []);

  return (
    <div className="services-wrapper">
      {/* Centered title */}
      <h1 className="services-title">Services</h1>
      
      {/* Container for school images */}
      <div className="services-images-container">
        <img src={logoImg} alt="School Logo" className="school-logo" />
      </div>

      {/* Single card for services */}
      <div className="services-card-container">
        <div className="services-card" onClick={handleServiceClick}>
          <img src={img1} alt="Service" className="services-img" />
          <h3 className="services-card-title">Services Details</h3>
        </div>
        
        {/* New Card beside the existing one */}
        <div className="services-card" onClick={handleNewCardClick}>
          <img src={img2} alt="New Feature" className="services-img" />
          <h3 className="services-card-title">Adding New Service</h3>
        </div>
      </div>
    </div>
  );
};

export default Services;
