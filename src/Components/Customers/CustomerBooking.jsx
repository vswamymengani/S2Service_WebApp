import { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerBooking.css';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState(''); // State for search input

  useEffect(() => {
    // Fetch data from the backend API
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get-payments'); // Replace with your backend API URL
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

  // Filter payments by ID based on the search query
  const filteredPayments = payments.filter((payment) =>
    payment.id.toString().includes(searchId.trim())
  );

  return (
    <div>
      <h2>Payment Details</h2>
      
      {/* Search Bar for Filtering by ID */}
      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '1200px' }}
      />
      
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
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
              <td colSpan="11" style={{ textAlign: 'center' }}>No payments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
