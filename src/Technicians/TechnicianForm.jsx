import React, { useState } from "react";
import "./TechnicianForm.css";

const TechnicianForm = () => {
  const [formData, setFormData] = useState({
    technicianName: "",
    technicianID: "",
    profilePicture: null,
    totalServicesCompleted: "",
    pendingServices: "",
    avgCompletionTime: "",
    lastServiceDate: "",
    avgCustomerRating: "",
    numberOfReviews: "",
    positiveFeedbackPercent: "",
    negativeFeedbackPercent: "",
    serviceCategories: "",
    servicesOverTime: "",
    avgResponseTime: "",
    reworkPercentage: "",
    complaints: "",
    performanceStats: "",
    activeHours: "",
    idleHours: "",
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
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="technician-form-container">
      <h2>Technician Information Form</h2>
      <form className="technician-form" onSubmit={handleSubmit}>
        <label>
          Technician Name:
          <input
            type="text"
            name="technicianName"
            value={formData.technicianName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Technician ID:
          <input
            type="text"
            name="technicianID"
            value={formData.technicianID}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Profile Picture:
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="form-file-input"
          />
        </label>

        <label>
          Total Services Completed:
          <input
            type="number"
            name="totalServicesCompleted"
            value={formData.totalServicesCompleted}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Pending Services:
          <input
            type="number"
            name="pendingServices"
            value={formData.pendingServices}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Average Completion Time (in hours):
          <input
            type="number"
            name="avgCompletionTime"
            value={formData.avgCompletionTime}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Last Service Date:
          <input
            type="date"
            name="lastServiceDate"
            value={formData.lastServiceDate}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Average Customer Rating (out of 5):
          <input
            type="number"
            name="avgCustomerRating"
            value={formData.avgCustomerRating}
            onChange={handleChange}
            required
            className="form-input"
            step="0.1"
            min="0"
            max="5"
          />
        </label>

        <label>
          Number of Reviews:
          <input
            type="number"
            name="numberOfReviews"
            value={formData.numberOfReviews}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Positive Feedback (%):
          <input
            type="number"
            name="positiveFeedbackPercent"
            value={formData.positiveFeedbackPercent}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Negative Feedback (%):
          <input
            type="number"
            name="negativeFeedbackPercent"
            value={formData.negativeFeedbackPercent}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Service Categories (comma-separated):
          <input
            type="text"
            name="serviceCategories"
            value={formData.serviceCategories}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Services Over Time (JSON data):
          <textarea
            name="servicesOverTime"
            value={formData.servicesOverTime}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </label>

        <label>
          Average Response Time (in minutes):
          <input
            type="number"
            name="avgResponseTime"
            value={formData.avgResponseTime}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Rework Percentage:
          <input
            type="number"
            name="reworkPercentage"
            value={formData.reworkPercentage}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Complaints:
          <input
            type="number"
            name="complaints"
            value={formData.complaints}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Performance Stats (JSON data):
          <textarea
            name="performanceStats"
            value={formData.performanceStats}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </label>

        <label>
          Active Hours (in hours):
          <input
            type="number"
            name="activeHours"
            value={formData.activeHours}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Idle Hours (in hours):
          <input
            type="number"
            name="idleHours"
            value={formData.idleHours}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <button type="submit" className="form-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TechnicianForm;
