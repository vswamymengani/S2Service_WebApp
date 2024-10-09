import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cd.css';

const Cd = () => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState([]); // State to store customer details fetched from the server
  const [searchText, setSearchText] = useState(''); // State to store the search input value
  const [errors, setErrors] = useState({}); // State to store any error messages

  // Fetch customer details when the component mounts
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await axios.get('http://localhost:3000/CustomerDetails');
        setCustomerDetails(response.data); // Set the customer details in the state
      } catch (err) {
        setErrors({ general: 'Failed to load customer details' }); // Set an error message if the API call fails
      }
    };
    fetchCustomerDetails();
  }, []);

  // Filter customer details based on search input
  const filteredCustomerDetails = customerDetails.filter(item =>
    item.id.toString().includes(searchText) // Use 'id' as the search key based on your JSON data
  );

  return (
    <div className="cd-container">
      

      {/* Search Bar */}
      <div className="cd-search-bar">
        <input
          type="text"
          placeholder="Search by Customer ID"
          className="cd-search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Update search text as the user types
        />
      </div>

      {/* Table Container */}
      <div className="cd-table-container">
        {/* Display any general errors */}
        {errors.general && <p className="cd-error">{errors.general}</p>}

        {/* Customer Details Table */}
        <table className="cd-customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Present Address</th>
              {/* <th>Password</th>
              <th>Confirm Password</th> */}
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomerDetails.length > 0 ? (
              filteredCustomerDetails.map((item) => (
                <tr key={item.id}>
                  {/* Display fields from your JSON data */}
                  <td>{item.id}</td>
                  <td>{item.fullname}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.presentaddress}</td>
                  {/* <td>{item.password}</td> */}
                  {/* <td>{item.confirmpassword}</td> */}
                  {/* Format the created_at date if it's available */}
                  <td>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</td>
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
