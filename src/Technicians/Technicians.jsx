import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from './technology (1).png';
import img2 from '../assets/technicom (1).png'
import img3 from './tech-support (1).png'
import logoImg from '../assets/slogo.png';
import './Technicians.css'; // Updated CSS file name

const Technicians = () => {
  const [technicianCount, setTechnicianCount] = useState(0);
  const navigate = useNavigate();

  // Handler function for navigating to the technician component
  const handleTechnicianClick = () => {
    navigate('/Td'); // Updated navigation path
  };

  const handleNewFeatureClick = () => {
    navigate('/new-feature'); // Updated navigation path for new feature
  };

  const handleBookingsClick = () => {
    navigate('/technician-bookings'); // New navigation path for Technician Bookings
  };

  useEffect(() => {
    axios.get('http://localhost:3000/s2technician') // Update API endpoint if necessary
      .then(response => setTechnicianCount(response.data.Technician_Count))
      .catch(error => console.error('Error fetching technician count:', error));
  }, []);

  return (
    <div className="technicians-wrapper">
      {/* Centered title */}
      <h1 className="technicians-title">Technicians</h1>
      
      {/* Container for school images */}
      <div className="technicians-images-container">
        <img src={logoImg} alt="School Logo" className="technicians-logo" />
      </div>

      {/* Container for technician cards */}
      <div className="technicians-card-container">
        {/* Existing card for Technician Bookings */}
        <div className="technicians-card" onClick={handleTechnicianClick}>
          <img src={img1} alt="Technicians" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Details</h3>
        </div>

        {/* New Card for New Feature */}
        <div className="technicians-card" onClick={handleNewFeatureClick}>
          <img src={img2} alt="New Feature" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Compliants</h3>
        </div>

        {/* New Card for Technicians Bookings */}
        <div className="technicians-card" onClick={handleBookingsClick}>
          <img src={img3} alt="Technicians Bookings" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Bookings</h3>
        </div>
      </div>
    </div>
  );
};

export default Technicians;
