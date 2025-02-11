import { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerBooking.css';
import logo1 from './slogo.png';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:4000/api/get-payments');
        setPayments(response.data.payments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to fetch payment details');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const filteredPayments = payments.filter((payment) =>
    payment.id.toString().includes(searchId.trim())
  );

  return (
    <div className="payment-table-container">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo1} alt="School Logo" className="school-logo" />
      </div>
      
      {/* Main Content */}
      <div className="payment-table-content">
        <h2 className="payment-table-heading">Payment Details</h2>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="payment-search-input"
        />
        
        {/* Payments Table */}
        <table className="payments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Service Details</th>
              <th>Selected Date</th>
              <th>Selected Time</th>
              <th>Address</th>
              <th>Total Amount</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>₹{(payment.amount / 100).toFixed(2)}</td>
                  <td>{payment.customer_name}</td>
                  <td>{payment.customer_contact}</td>
                  <td>{payment.customer_email}</td>
                  <td>
                    {(() => {
                      try {
                        const services = JSON.parse(payment.service_details);
                        if (Array.isArray(services) && services.length > 0) {
                          const service = services[0];
                          return `${service.servicename || 'N/A'} - ${service.description || 'N/A'}`;
                        }
                        return 'N/A';
                      } catch {
                        return 'N/A';
                      }
                    })()}
                  </td>
                  <td>{payment.selected_date}</td>
                  <td>{payment.selected_time}</td>
                  <td>
                    {(() => {
                      try {
                        const address = JSON.parse(payment.address);
                        const { addressType, flatDetails, landmark, location } = address;

                        const locationString =
                          typeof location === 'object' && location !== null
                            ? `${location.lat}, ${location.lng}`
                            : location || '';

                        return `${addressType || ''}, ${flatDetails || ''}, ${landmark || ''}, ${locationString}`;
                      } catch {
                        return 'N/A';
                      }
                    })()}
                  </td>
                  <td>₹{(payment.total_amount / 100).toFixed(2)}</td>
                  <td>{payment.payment_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-payments">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
