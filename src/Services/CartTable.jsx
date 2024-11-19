import { useState, useEffect } from 'react';
import axios from 'axios';
import './CartTable.css'; // Assuming you have styles defined in this file

const CartTable = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        // Replace with the correct URL or mock data source
        const response = await axios.get('http://localhost:3000/getcartdetails');
        setCartDetails(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load cart details' });
      }
    };
    fetchCartDetails();
  }, []);

  return (
    <div className="cart-container">
      {errors.general && <p className="cart-error">{errors.general}</p>}
      <div className="cart-table-container">
        <table className="cart-details-table">
          <thead>
            <tr>
              <th>Cart ID</th>
              <th>User ID</th>
              <th>Service Name</th>
              <th>Technician Name</th>
              <th>Quantity</th>
              <th>Price per Service</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Booking Date</th>
              <th>Booking Time</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Address</th>
              <th>Special Instructions</th>
              <th>Promo Code</th>
              <th>Discount Amount</th>
              <th>Tax Amount</th>
              <th>Advance Payments</th>
              <th>Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails.length > 0 ? (
              cartDetails.map((item) => (
                <tr key={item.cart_id}>
                  <td>{item.cart_id}</td>
                  <td>{item.user_id}</td>
                  <td>{item.service_name}</td>
                  <td>{item.technician_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price_per_service}</td>
                  <td>{item.total_price}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.booking_date).toLocaleDateString()}</td>
                  <td>{new Date(item.booking_time).toLocaleTimeString()}</td>
                  <td>{item.payment_status}</td>
                  <td>{item.payment_method}</td>
                  <td>{item.address}</td>
                  <td>{item.special_instructions}</td>
                  <td>{item.promo_code}</td>
                  <td>{item.discount_amount}</td>
                  <td>{item.tax_amount}</td>
                  <td>{item.advance_payments}</td>
                  <td>{item.remaining_balance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="18" className="cart-no-data">No cart details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartTable;
