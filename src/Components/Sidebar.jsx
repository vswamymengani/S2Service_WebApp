import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faSignOutAlt, faBars, faArrowLeft, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sclimg1 from '../sms images/scllogo1.jpg';
import './Sidebar.css'

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to Home
  };

  const handleLogoutClick = () => {
    // Add your logout logic
  };

  const handleDashboardClick = () => {
    navigate('/Home'); // Navigate to Dashboard
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      <div className="profile-section">
        <h4>Admin</h4>
      </div>
      
      <div className="menu">
        <div className="menu-item" onClick={handleHomeClick}>
          <FontAwesomeIcon icon={faHome} size="lg" />
          <span>Home</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faCog} size="lg" />
          <span>Settings</span>
        </div>
        
        {/* Go to Dashboard Icon */}
        <div className="menu-item" onClick={handleDashboardClick}>
          <FontAwesomeIcon icon={faTachometerAlt} size="lg" />
          <span>Go To Dashboard</span>
        </div>

        {/* Back Icon */}
        <div className="menu-item" onClick={handleBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span>Back</span>
        </div>
        
        <div className="menu-item" onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          <span>Logout</span>
        </div>
      </div>

      <div className="school-logo1">
        <img src={sclimg1} alt="School Logo" className="school-logo-img2" />
      </div>
    </div>
  );
};

export default Sidebar;
