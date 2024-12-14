import { useState, useEffect } from 'react';
import './CustomerBooking.css';
import logoImg from "./slogo.png"; // School logo image

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch all customer bookings
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bookings');
        if (response.ok) {
          const data = await response.json();
          setBookings(data); // Store the bookings in state
        } else {
          console.error('Error fetching bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="customer-booking-container">
      {/* School logo */}
            <div className="customers-images-container">
              <img src={logoImg} alt="School Logo" className="school-logo" />
            </div>
      <h2 className="customer-booking-title">Customer Bookings</h2>
      <table className="customer-booking-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Booking Date</th>
            <th>Scheduled Date</th>
            <th>Scheduled Time</th>
            <th>Service Type</th>
            <th>Description of Issue</th>
            <th>Preferred Technician</th>
            <th>Service Category</th>
            <th>Booking Status</th>
            <th>Job Status</th>
            <th>Service Completed Date</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Total Amount</th>
            <th>Discount Applied</th>
            <th>Assigned Technician ID</th>
            <th>Technician Name</th>
            <th>Technician Notes</th>
            <th>Customer Feedback</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.CustomerID}>
              <td>{booking.CustomerID}</td>
              <td>{booking.EmailAddress}</td>
              <td>{booking.PhoneNumber}</td>
              <td>{booking.Address}</td>
              <td>{booking.BookingDate}</td>
              <td>{booking.ScheduledDate}</td>
              <td>{booking.ScheduledTime}</td>
              <td>{booking.ServiceType}</td>
              <td>{booking.DescriptionOfIssue}</td>
              <td>{booking.PreferredTechnician}</td>
              <td>{booking.ServiceCategory}</td>
              <td>{booking.BookingStatus}</td>
              <td>{booking.JobStatus}</td>
              <td>{booking.ServiceCompletedDate}</td>
              <td>{booking.PaymentMethod}</td>
              <td>{booking.PaymentStatus}</td>
              <td>{booking.TotalAmount}</td>
              <td>{booking.DiscountApplied}</td>
              <td>{booking.AssignedTechnicianID}</td>
              <td>{booking.TechnicianName}</td>
              <td>{booking.TechnicianNotes}</td>
              <td>{booking.CustomerFeedback}</td>
              <td>{booking.Notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerBookings;
