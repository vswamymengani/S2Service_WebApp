import React, { useState } from 'react';
import './ServiceHistory.css';

const ServiceHistory = () => {
  const [formData, setFormData] = useState({
    serviceID: '',
    customerName: '',
    serviceType: '',
    technician: '',
    serviceDate: '',
    status: '',
    amountCharged: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Form Submitted Successfully!');
    setFormData({
      serviceID: '',
      customerName: '',
      serviceType: '',
      technician: '',
      serviceDate: '',
      status: '',
      amountCharged: '',
      rating: '',
    });
  };

  return (
    <div className="service-history-container">
      <h2 className="service-history-heading">Service Details Form</h2>
      <form className="service-history-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="field-label">Service ID:</label>
          <input className="field-input" type="text" name="serviceID" value={formData.serviceID} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label className="field-label">Customer Name:</label>
          <input className="field-input" type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label className="field-label">Service Type:</label>
          <input className="field-input" type="text" name="serviceType" value={formData.serviceType} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label className="field-label">Technician:</label>
          <input className="field-input" type="text" name="technician" value={formData.technician} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label className="field-label">Service Date:</label>
          <input className="field-input" type="date" name="serviceDate" value={formData.serviceDate} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label className="field-label">Status:</label>
          <select className="field-input" name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div className="form-field">
          <label className="field-label">Amount Charged ($):</label>
          <input className="field-input" type="number" name="amountCharged" value={formData.amountCharged} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label className="field-label">Rating:</label>
          <input className="field-input" type="number" name="rating" value={formData.rating} onChange={handleChange} step="0.1" min="0" max="5" />
        </div>
        <button className="form-submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ServiceHistory;
