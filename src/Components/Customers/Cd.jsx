import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cd.css';

const Cd = () => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/CustomerDetails');
        setCustomerDetails(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load customer details' });
      }
    };
    fetchCustomerDetails();
  }, []);

  const filteredCustomerDetails = customerDetails.filter(item =>
    item.sid.toString().includes(searchText)
  );

  return (
    <div className="cd-container">
      <div className="cd-button-group">
        <button className="cd-btn cd-register-btn" onClick={() => navigate('/Register')}>
          Register
        </button>
        <button className="cd-btn cd-modify-btn" onClick={() => navigate('/Modify')}>
          Modify
        </button>
      </div>

      <div className="cd-search-bar">
        <input
          type="text"
          placeholder="Search by Customer ID"
          className="cd-search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="cd-table-container">
        {errors.general && <p className="cd-error">{errors.general}</p>}
        <table className="cd-customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Present Address</th>
              <th>Password</th>
              <th>Confirm Password</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomerDetails.length > 0 ? (
              filteredCustomerDetails.map((item) => (
                <tr key={item.sid}>
                  <td>{item.id}</td>
                  <td>{item.fullname}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.presentaddress}</td>
                  <td>{item.password}</td>
                  <td>{item.confirmpassword}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="cd-no-data">No customer details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cd;
