import React, { useState } from "react";
import BookingForm from "./BookingForm"; // Import the BookingForm component
import CustomerFeedbackForm from "./CustomerFeedbacl"; // Import the CustomerBookingForm component
import "./SupportForm.css";

const SupportForm = () => {
  const [showBookingForm, setShowBookingForm] = useState(false); // State to toggle BookingForm visibility
  const [showCustomerBookingForm, setShowCustomerBookingForm] = useState(false); // State to toggle CustomerBookingForm visibility

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    serviceReference: "",
    typeOfRequest: "",
    subject: "",
    message: "",
    rating: "",
    attachments: null,
    preferredContactMethod: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const handleNewRequestClick = () => {
    setShowBookingForm((prev) => !prev); // Toggle the BookingForm visibility
    setShowCustomerBookingForm(false); // Ensure CustomerBookingForm is hidden
  };

  const handleCustomerBookingClick = () => {
    setShowCustomerBookingForm((prev) => !prev); // Toggle the CustomerBookingForm visibility
    setShowBookingForm(false); // Ensure BookingForm is hidden
  };

  return (
    <div className="support-form-container">
      <h2>Customer Support Form</h2>
      <form className="support-form" onSubmit={handleSubmit}>
        <div className="support-form-buttons">
          <button
            type="button"
            className="support-form-button new-service-button"
            onClick={handleNewRequestClick}
          >
            New Service Request
          </button>
          <button
            type="button"
            className="support-form-button customer-booking-button"
            onClick={handleCustomerBookingClick}
          >
            Customer Feedback Form
          </button>
        </div>

        {/* The rest of your form fields */}

    
      </form>

      {/* Conditionally render the BookingForm */}
      {showBookingForm && <BookingForm />}

      {/* Conditionally render the CustomerBookingForm */}
      {showCustomerBookingForm && <CustomerFeedbackForm />}
    </div>
  );
};

export default SupportForm;
