import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from "./cusdeta (1).png";
import logoImg from "./slogo.png"; // School logo image
import img2 from "./call (1).png";
import SupportForm from "./SupportForm"; // Import the SupportForm component
import "./Customers.css";

const Customers = () => {
  const [customerCount, setCustomerCount] = useState(0); // State for customer count
  const [showSupportForm, setShowSupportForm] = useState(false); // State to toggle SupportForm
  const navigate = useNavigate();

  // Handlers for navigation
  const handleCdClick = () => {
    navigate("/Cd");
  };

  const handleNewCardClick = () => {
    navigate("/student");
  };

  // Handler to toggle the SupportForm visibility
  const handleNewCardClick1 = () => {
    setShowSupportForm((prev) => !prev); // Toggle the form visibility
  };

  // Fetch the customer count
  const fetchCustomerCount = async () => {
    try {
      const response = await axios.get("http://localhost:3000/CustomerCount");
      setCustomerCount(response.data.customerCount);
    } catch (error) {
      console.error("Error fetching customer count:", error);
    }
  };

  useEffect(() => {
    fetchCustomerCount();
  }, []);

  return (
    <div className="customers-wrapper">
      {/* Centered title */}
      <h1 className="customers-title">Customer</h1>

      {/* School logo */}
      <div className="customers-images-container">
        <img src={logoImg} alt="School Logo" className="school-logo" />
      </div>

      {/* Cards */}
      <div className="customers-card-container">
        <div className="customers-card" onClick={handleCdClick}>
          <img src={img1} alt="Customers" className="customers-img" />
          <h3 className="customers-card-title">Customer Profiles</h3>
          <h3 className="customers-card-title">Total {customerCount} Customers</h3>
        </div>

        <div className="customers-card" onClick={handleNewCardClick}>
          <img src={img2} alt="Customer Bookings" className="customers-img" />
          <h3 className="customers-card-title">Customer Bookings</h3>
        </div>

        <div className="customers-card" onClick={handleNewCardClick1}>
          <img src={img2} alt="Customer Support and Feedback" className="customers-img" />
          <h3 className="customers-card-title">Customer Support and Feedback</h3>
        </div>
      </div>

      {/* Conditional rendering of SupportForm */}
      {showSupportForm && (
        <div className="support-form-container">
          <SupportForm />
        </div>
      )}
    </div>
  );
};

export default Customers;
