import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from "./cusdeta (1).png";
import logoImg from "./slogo.png"; // School logo image
import img2 from "./call (1).png";
import img3 from './customer-service (1).png';
import SupportForm from "./SupportForm"; // Import the SupportForm component
import "./Customers.css";

const Customers = () => {
  const [customerCount, setCustomerCount] = useState(0); // State for customer count
  const [activeCard, setActiveCard] = useState(""); // State to track the active card
  const navigate = useNavigate();

  // Handlers for navigation
  const handleCdClick = () => {
    setActiveCard("customerProfiles"); // Set active card
    navigate("/Cd");
  };

  const handleNewCardClick = () => {
    setActiveCard("CustomerBooking"); // Set active card
    navigate("/CustomerBooking");
  };

  // Handler to toggle the SupportForm visibility
  const handleNewCardClick1 = () => {
    setActiveCard("customerSupport"); // Set active card
  };

  // Fetch the customer count
  const fetchCustomerCount = async () => {
    try {
      const response = await axios.get("http://18.60.190.183:4000/CustomerCount");
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
        <div
          className={`customers-card ${
            activeCard === "customerProfiles" ? "active-card" : ""
          }`}
          onClick={handleCdClick}
        >
          <img src={img1} alt="Customers" className="customers-img" />
          <h3 className="customers-card-title">Customer Profiles</h3>
          <h3 className="customers-card-title">Total {customerCount} Customers</h3>
        </div>

        <div
          className={`customers-card ${
            activeCard === "customerBookings" ? "active-card" : ""
          }`}
          onClick={handleNewCardClick}
        >
          <img src={img2} alt="Customer Bookings" className="customers-img" />
          <h3 className="customers-card-title">Customer Bookings</h3>
        </div>

        <div
          className={`customers-card ${
            activeCard === "customerSupport" ? "active-card" : ""
          }`}
          onClick={handleNewCardClick1}
        >
          <img src={img3} alt="Customer Support and Feedback" className="customers-img" />
          <h3 className="customers-card-title">Customer Support and Feedback</h3>
        </div>
      </div>

      {/* Conditional rendering of SupportForm */}
      {activeCard === "customerSupport" && (
        <div>
          <SupportForm />
        </div>
      )}
    </div>
  );
};

export default Customers;
