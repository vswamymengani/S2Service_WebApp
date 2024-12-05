import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from './technology (1).png'; // Technician Details image
import img2 from '../assets/technicom (1).png'; // Technician Complaints image
import img3 from './tech-support (1).png'; // Technician Bookings image
import logoImg from '../assets/slogo.png'; // School logo image
import './Technicians.css'; // CSS file for the Technicians component

const Technicians = () => {
  // State to store the technician count
  const [technicianCount, setTechnicianCount] = useState(0);
  const navigate = useNavigate();

  // Fetch the technician count from the API when the component mounts
  useEffect(() => {
    const fetchTechnicianCount = async () => {
      try {
        // API call to get the technician count
        const response = await axios.get('http://localhost:3000/TechniciansCount');
        setTechnicianCount(response.data.technicianCount); // Set the technician count from the response
      } catch (error) {
        console.error('Error fetching technician count:', error);
      }
    };

    fetchTechnicianCount(); // Call the function to fetch technician count
  }, []);

  // Handler functions for navigation
  const handleTechnicianClick = () => {
    navigate('/Td'); // Navigate to Technician Details component
  };

  const handleNewFeatureClick = () => {
    navigate('/TechServiceList'); // Navigate to Technician Complaints component
  };

  const handleBookingsClick = () => {
    navigate('/technician-bookings'); // Navigate to Technician Bookings component
  };

  return (
    <div className="technicians-wrapper">
      {/* Centered title for the component */}
      <h1 className="technicians-title">Technicians</h1>


      {/* Container for school logo */}
      <div className="technicians-images-container">
        <img src={logoImg} alt="School Logo" className="technicians-logo" />
      </div>

      {/* Container for the technician cards */}
      <div className="technicians-card-container">
        {/* Card for Technician Details */}
        <div className="technicians-card" onClick={handleTechnicianClick}>
          <img src={img1} alt="Technicians" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Profiles</h3>
          
      {/* Display the dynamic technician count */}
      <h3 className="technicians-card-title">Total {technicianCount} Technicians</h3>
        </div>

        {/* Card for Technician Complaints */}
        <div className="technicians-card" onClick={handleNewFeatureClick}>
          <img src={img2} alt="TechServiceList" className="technicians-img" />
          <h3 className="technicians-card-title">TechServiceList</h3>
        </div>

        {/* Card for Technician Bookings */}
        <div className="technicians-card" onClick={handleBookingsClick}>
          <img src={img3} alt="Technician Bookings" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Performance</h3>
        </div>

        <div className="technicians-card" onClick={handleBookingsClick}>
          <img src={img3} alt="Technician Bookings" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Ratings and Reviews</h3>
        </div>

        <div className="technicians-card" onClick={handleBookingsClick}>
          <img src={img3} alt="Technician Bookings" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Booking History</h3>
        </div>

      </div>
    </div>
  );
};

export default Technicians;
