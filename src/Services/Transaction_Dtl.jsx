import { useState, useEffect } from 'react';
import axios from 'axios';
import './Transaction_Dtl.css'; // Updated filename for CSS

const Transaction_Dtl = () => {
  const [transactions, setTransactions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Replace with the correct URL or mock data source
        const response = await axios.get('http://localhost:3000/gettransactions');
        setTransactions(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load transaction details' });
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="transaction-container">
      {errors.general && <p className="transaction-error">{errors.general}</p>}
      <div className="transaction-table-container">
        <table className="transaction-details-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Cart ID</th>
              <th>ID</th>
              <th>Transaction Date</th>
              <th>Transaction Amount</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Transaction Reference</th>
              <th>Payment Gateway</th>
              <th>Currency</th>
              <th>Refund Status</th>
              <th>Refund Amount</th>
              <th>Created Date</th>
              <th>Updated Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.transaction_id}</td>
                  <td>{transaction.cart_id}</td>
                  <td>{transaction.id}</td>
                  <td>{new Date(transaction.transaction_date).toLocaleString()}</td>
                  <td>{transaction.transaction_amount}</td>
                  <td>{transaction.payment_status}</td>
                  <td>{transaction.payment_method}</td>
                  <td>{transaction.transaction_reference}</td>
                  <td>{transaction.payment_gateway}</td>
                  <td>{transaction.currency}</td>
                  <td>{transaction.refund_status}</td>
                  <td>{transaction.refund_amount || 'N/A'}</td>
                  <td>{new Date(transaction.created_date).toLocaleString()}</td>
                  <td>{new Date(transaction.updated_date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="transaction-no-data">No transaction details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction_Dtl;
