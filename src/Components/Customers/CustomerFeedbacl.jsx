import React, { useState } from "react";
import "./CustomerFeedback.css";

const CustomerFeedbackForm = () => {
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

  return (
    <div className="support-form-container">
      <h2>Customer Support Form</h2>
      <form className="support-form" onSubmit={handleSubmit}>




        <label className="support-form-label">
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="support-form-input"
          />
        </label>

        <label className="support-form-label">
          Email Address:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="support-form-input"
          />
        </label>

        <label className="support-form-label">
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="support-form-input"
          />
        </label>

        <label className="support-form-label">
          Service Reference Number:
          <input
            type="text"
            name="serviceReference"
            value={formData.serviceReference}
            onChange={handleChange}
            className="support-form-input"
          />
        </label>

        <label className="support-form-label">
          Type of Request:
          <select
            name="typeOfRequest"
            value={formData.typeOfRequest}
            onChange={handleChange}
            required
            className="support-form-select"
          >
            <option value="">Select...</option>
            <option value="Service Issue">Service Issue</option>
            <option value="Payment Issue">Payment Issue</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Feedback">Feedback</option>
          </select>
        </label>

        <label className="support-form-label">
          Subject:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="support-form-input"
          />
        </label>

        <label className="support-form-label">
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="support-form-textarea"
          />
        </label>

        <label className="support-form-label">
          Rating:
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="support-form-select"
          >
            <option value="">Rate the service...</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </label>

        <label className="support-form-label">
          Attachments:
          <input
            type="file"
            name="attachments"
            onChange={handleChange}
            className="support-form-file-input"
          />
        </label>

        <label className="support-form-label">
          Preferred Contact Method:
          <select
            name="preferredContactMethod"
            value={formData.preferredContactMethod}
            onChange={handleChange}
            required
            className="support-form-select"
          >
            <option value="">Select...</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
          </select>
        </label>

        <button type="submit" className="support-form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerFeedbackForm;
