import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from '../assets/article (1).png';
import logoImg from '../assets/slogo.png'; // School logo image
import img2 from '../assets/article (1).png'; // Placeholder for new feature image
import './Images.css'; // Updated CSS file name

const Images = () => {
  const [studentCount, setStudentCount] = useState(0);
  const navigate = useNavigate();

  // Handler function for navigating to the student component
  const handleIoClick = () => {
    navigate('/Events');
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
    <div className="images-wrapper">
      {/* Centered title */}
      <h1 className="images-title">Images</h1>
      
      {/* Container for school images */}
      <div className="images-logo-container">
        <img src={logoImg} alt="School Logo" className="school-logo" />
      </div>

      {/* Single card for images */}
      <div className="images-card-container">
        <div className="images-card" onClick={handleIoClick}>
          <img src={img1} alt="Service" className="images-img" />
          <h3 className="images-card-title">Image Details</h3>
        </div>
        
        {/* New Card beside the existing one */}
        <div className="images-card" onClick={handleNewCardClick}>
          <img src={img2} alt="New Feature" className="images-img" />
          <h3 className="images-card-title">Image Complaints</h3>
        </div>
      </div>
    </div>
  );
};

export default Images;
