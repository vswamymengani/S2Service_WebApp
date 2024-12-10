import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from '../assets/article (1).png';
import logoImg from '../assets/slogo.png';
import img2 from '../assets/article (1).png';
import ServiceBookingForm from '../Services/ServiceBookingForm'; // Import the form component
import './Images.css';

const Images = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [selectedCard, setSelectedCard] = useState(""); // State to track the selected card
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/s2customer')
      .then((response) => setStudentCount(response.data.Student_Count))
      .catch((error) => console.error('Error fetching student count:', error));
  }, []);

  // Handler for card clicks
  const handleCardClick = (cardName) => {
    setSelectedCard(cardName);
  };

  return (
    <div className="images-wrapper">
      {/* Centered title */}
      <h1 className="images-title">Service Request Management</h1>

      {/* Container for school images */}
      <div className="images-logo-container">
        <img src={logoImg} alt="School Logo" className="school-logo" />
      </div>

      {/* Cards */}
      <div className="images-card-container">
        <div
          className={`images-card ${selectedCard === "serviceHistory" ? "active-card" : ""}`}
          onClick={() => handleCardClick("serviceHistory")}
        >
          <img src={img1} alt="Service" className="images-img" />
          <h3 className="images-card-title">Service History</h3>
        </div>

        <div
          className={`images-card ${selectedCard === "scheduleService" ? "active-card" : ""}`}
          onClick={() => handleCardClick("scheduleService")}
        >
          <img src={img2} alt="New Feature" className="images-img" />
          <h3 className="images-card-title">Schedule Service</h3>
        </div>

        <div
          className={`images-card ${selectedCard === "newRequest" ? "active-card" : ""}`}
          onClick={() => handleCardClick("newRequest")}
        >
          <img src={img1} alt="New Request" className="images-img" />
          <h3 className="images-card-title">New Request</h3>
        </div>

        <div
          className={`images-card ${selectedCard === "otherDetails" ? "active-card" : ""}`}
          onClick={() => handleCardClick("otherDetails")}
        >
          <img src={img1} alt="Other Details" className="images-img" />
          <h3 className="images-card-title">Other Details</h3>
        </div>
      </div>

      {/* Display the form when "New Request" is selected */}
      {selectedCard === "newRequest" && (
        <div className="form-container">
          <ServiceBookingForm />
        </div>
      )}
    </div>
  );
};

export default Images;
