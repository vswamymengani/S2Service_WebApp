import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cd.css';
import logoI from './slogo.png';

const CustomerDetails = () => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:4000/CustomerDetails');
        setCustomerDetails(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load customer details' });
      }
    };
    fetchCustomerDetails();
  }, []);

  const filteredCustomerDetails = customerDetails.filter(item =>
    item.id.toString().includes(searchText)
  );

  return (
    <div>
    {/* School logo */}
    <div className="customers-images-container2">
    <img src={logoI} alt="School Logo" className="school-logo2" />
  </div>
    
    <div className="customer-container">
      
            
      {/* Search Bar */}

      <div className="customer-search-bar">
        <input
          type="text"
          placeholder="Search by Customer ID"
          className="customer-search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Table Container */}
      <div className="customer-table-container">
        {errors.general && <p className="customer-error">{errors.general}</p>}

        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Present Address</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomerDetails.length > 0 ? (
              filteredCustomerDetails.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fullname}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.presentaddress}</td>
                  <td>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="customer-no-data">No customer details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default CustomerDetails;
