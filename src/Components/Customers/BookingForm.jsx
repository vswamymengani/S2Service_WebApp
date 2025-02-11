import  { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    customerID: '00000', // Default value set to '00000'
    emailAddress: '',
    phoneNumber: '',
    address: '',
    bookingDate: '',
    scheduledDate: '',
    scheduledTime: '',
    serviceType: '',
    descriptionOfIssue: '',
    preferredTechnician: '',
    serviceCategory: '',
    bookingStatus: '',
    jobStatus: '',
    serviceCompletedDate: '',
    paymentMethod: '',
    paymentStatus: '',
    totalAmount: '',
    discountApplied: '',
    assignedTechnicianID: '',
    technicianName: '',
    technicianNotes: '',
    customerFeedback: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://18.60.190.183:3000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Log success message or handle it as needed
        alert('Booking created successfully');
      } else {
        const errorResult = await response.json();
        console.error('Error:', errorResult);
        alert('There was an error creating the booking');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the booking');
    }
  };
  

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <small className="note">Note: Non-registered customers have an ID of 00000</small>
      <h2>Booking Form</h2>

      <div className="form-group">
        <label>Customer ID *</label>
        <input type="number" name="customerID" value={formData.customerID} onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label>Email Address *</label>
        <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Address *</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Booking Date *</label>
        <input type="datetime-local" name="bookingDate" value={formData.bookingDate} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Scheduled Date *</label>
        <input type="date" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Scheduled Time *</label>
        <input type="time" name="scheduledTime" value={formData.scheduledTime} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Service Type *</label>
        <input type="text" name="serviceType" value={formData.serviceType} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Description of Issue *</label>
        <textarea name="descriptionOfIssue" value={formData.descriptionOfIssue} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Preferred Technician</label>
        <input type="number" name="preferredTechnician" value={formData.preferredTechnician} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Service Category *</label>
        <input type="text" name="serviceCategory" value={formData.serviceCategory} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Booking Status *</label>
        <input type="text" name="bookingStatus" value={formData.bookingStatus} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Job Status *</label>
        <input type="text" name="jobStatus" value={formData.jobStatus} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Service Completed Date</label>
        <input type="datetime-local" name="serviceCompletedDate" value={formData.serviceCompletedDate} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Payment Method *</label>
        <input type="text" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Payment Status *</label>
        <input type="text" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Total Amount *</label>
        <input type="number" step="0.01" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Discount Applied</label>
        <input type="number" step="0.01" name="discountApplied" value={formData.discountApplied} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Technician Name</label>
        <input type="text" name="technicianName" value={formData.technicianName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Technician Notes</label>
        <textarea name="technicianNotes" value={formData.technicianNotes} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Customer Feedback</label>
        <textarea name="customerFeedback" value={formData.customerFeedback} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </div>

      <button type="submit">Submit Booking</button>
    </form>
  );
};

export default BookingForm;
