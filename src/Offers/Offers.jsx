import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import offerImg1 from '../assets/job-description (1).png';
import offerImg2 from '../assets/job-description (1).png';
import offerLogo from '../assets/slogo.png'; // Placeholder logo image for offers
import './Offers.css'; // Updated CSS import

const Offers = () => {
  const [offerCount, setOfferCount] = useState(0);
  const navigate = useNavigate();

  // Handler function for navigating to different offers
  const handleIoClick = () => {
    navigate('/Io');
  };

  const handleNewOfferClick = () => {
    navigate('/offer-compliants');
  };

  return (
    <div className="offers-wrapper">
      {/* Centered title */}
      <h1 className="offers-title">Offers</h1>
      
      {/* Container for logo images */}
      <div className="offers-logo-container">
        <img src={offerLogo} alt="Offer Logo" className="offer-logo" />
      </div>

      {/* Single card for offers */}
      <div className="offers-card-container">
        <div className="offers-card" onClick={handleIoClick}>
          <img src={offerImg1} alt="Offer 1" className="offers-img" />
          <h3 className="offers-card-title">Offer Details</h3>
        </div>
        
        {/* New Card beside the existing one */}
        <div className="offers-card" onClick={handleNewOfferClick}>
          <img src={offerImg2} alt="Offer 2" className="offers-img" />
          <h3 className="offers-card-title">New Offer</h3>
        </div>
      </div>
    </div>
  );
};

export default Offers;
