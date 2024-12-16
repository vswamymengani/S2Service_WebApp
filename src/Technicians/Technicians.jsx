import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from './technology (1).png';
import img2 from '../assets/technicom (1).png';
import img3 from './tech-support (1).png';
import img4 from '../assets/Technicianratings.png';
import img5 from '../assets/technician (2) (1).png'
import logoImg from '../assets/slogo.png';
import TechniciansTable from '../Technicians/TechniciansTable';
import TechnicianRating from './TechnicianRatings'; // Import TechnicianRating component
import './Technicians.css';

const Technicians = () => {
  const [technicianCount, setTechnicianCount] = useState(0);
  const [showTechnicianForm, setShowTechnicianForm] = useState(false);
  const [showTechnicianRating, setShowTechnicianRating] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnicianCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/TechniciansCount');
        setTechnicianCount(response.data.technicianCount);
      } catch (error) {
        console.error('Error fetching technician count:', error);
      }
    };

    fetchTechnicianCount();
  }, []);

  const handleTechnicianClick = () => navigate('/Td');
  const handleNewFeatureClick = () => navigate('/TechServiceList');
  const handleBookingsClick = () => navigate('/technician-bookings');

  const handlePerformanceClick = () => {
    setShowTechnicianForm((prevState) => !prevState);
    setSelectedCard('performance');
  };

  const handleRatingsClick = () => {
    setShowTechnicianRating((prevState) => !prevState);
    setSelectedCard('ratings');
  };

  const isSelected = (cardName) => selectedCard === cardName;

  return (
    <div className="technicians-wrapper">
      <h1 className="technicians-title">Technicians</h1>

      <div className="technicians-images-container">
        <img src={logoImg} alt="School Logo" className="technicians-logo" />
      </div>

      <div className="technicians-card-container">
        <div className={`technicians-card ${isSelected('profiles') ? 'selected' : ''}`} onClick={handleTechnicianClick}>
          <img src={img1} alt="Technicians" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Profiles</h3>
          <h3 className="technicians-card-title">Total {technicianCount} Technicians</h3>
        </div>

        <div className={`technicians-card ${isSelected('complaints') ? 'selected' : ''}`} onClick={handleNewFeatureClick}>
          <img src={img2} alt="TechServiceList" className="technicians-img" />
          <h3 className="technicians-card-title">TechServiceList</h3>
        </div>

        <div className={`technicians-card ${isSelected('performance') ? 'selected' : ''}`} onClick={handlePerformanceClick}>
          <img src={img5} alt="Technician Performance" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Performance</h3>
        </div>

        <div className={`technicians-card ${isSelected('ratings') ? 'selected' : ''}`} onClick={handleRatingsClick}>
          <img src={img4} alt="Technician Ratings" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Ratings and Reviews</h3>
        </div>

        <div className="technicians-card" onClick={handleBookingsClick}>
          <img src={img3} alt="Technician Bookings" className="technicians-img" />
          <h3 className="technicians-card-title">Technician Booking History</h3>
        </div>
      </div>

      {showTechnicianForm && (
        <div className="technician-form-container">
          <TechniciansTable />
        </div>
      )}

      {showTechnicianRating && (
        <div className="technician-rating-container">
          <TechnicianRating />
        </div>
      )}
    </div>
  );
};

export default Technicians;
