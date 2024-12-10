import React, { useState } from "react";
import "./ServiceBookingForm.css";

const ServiceBookingForm = () => {
  const [formData, setFormData] = useState({
    bookingID: "AUTO_GENERATED", // Placeholder for auto-generated ID
    customerName: "",
    customerContact: "",
    serviceType: "",
    requestedDate: "",
    preferredTime: "",
    address: "",
    serviceDescription: "",
    bookingStatus: "Pending", // Default status
    assignedTechnician: "",
    scheduledDate: "",
    scheduledTime: "",
    paymentStatus: "Not Paid", // Default status
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Service Booking Request Submitted Successfully!");
    // Add further submission logic (e.g., API calls) here
  };

  return (
    <div className="service-request-form-container">
      <h2 className="service-request-title">New Service Booking Request</h2>
      <form onSubmit={handleSubmit} className="service-request-form">
        <div className="service-request-group">
          <label>Booking ID (Auto-Generated):</label>
          <input type="text" value={formData.bookingID} readOnly disabled />
        </div>

        <div className="service-request-group">
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="service-request-group">
          <label>Customer Contact:</label>
          <input
            type="text"
            name="customerContact"
            value={formData.customerContact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="service-request-group">
          <label>Service Type:</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="AC Repair">AC Repair</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="service-request-group">
          <label>Requested Date:</label>
          <input
            type="date"
            name="requestedDate"
            value={formData.requestedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="service-request-group">
          <label>Preferred Time:</label>
          <input
            type="time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
          />
        </div>

        <div className="service-request-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="service-request-group">
          <label>Service Description:</label>
          <textarea
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
          />
        </div>

        <div className="service-request-group">
          <label>Booking Status:</label>
          <select
            name="bookingStatus"
            value={formData.bookingStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
        </div>

        <div className="service-request-group">
          <label>Assigned Technician:</label>
          <input
            type="text"
            name="assignedTechnician"
            value={formData.assignedTechnician}
            onChange={handleChange}
          />
        </div>

        <div className="service-request-group">
          <label>Scheduled Date:</label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
          />
        </div>

        <div className="service-request-group">
          <label>Scheduled Time:</label>
          <input
            type="time"
            name="scheduledTime"
            value={formData.scheduledTime}
            onChange={handleChange}
          />
        </div>

        <div className="service-request-group">
          <label>Payment Status:</label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Not Paid">Not Paid</option>
          </select>
        </div>

        <div className="service-request-group">
          <label>Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>

        <div className="service-request-actions">
          <button type="submit" className="service-request-submit">
            Submit
          </button>
          <button
            type="reset"
            onClick={() => setFormData({ ...formData, comments: "" })}
            className="service-request-reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceBookingForm;
