import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Td.css';

const Td = () => {
  const navigate = useNavigate();
  const [techniciansDetails, setTechniciansDetails] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTechniciansDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/TechniciansDetails');

        setTechniciansDetails(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load technician details' });
      }
    };
    fetchTechniciansDetails();
  }, []);

  const filteredTechniciansDetails = techniciansDetails.filter(item =>
    item.sid.toString().includes(searchText)
  );

  return (
    <div className="td-container">
      <div className="td-button-group">
        <button className="td-btn td-register-btn" onClick={() => navigate('/Register')}>
          Register
        </button>
        <button className="td-btn td-modify-btn" onClick={() => navigate('/modify')}>
          Modify
        </button>
      </div>

      <div className="td-search-bar">
        <input
          type="text"
          placeholder="Search by Technician ID"
          className="td-search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="td-table-container">
        {errors.general && <p className="td-error">{errors.general}</p>}
        <table className="td-technician-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Present Address</th>
              <th>Work Experience</th>
              <th>Password</th>
              <th>Confirm Password</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechniciansDetails.length > 0 ? (
              filteredTechniciansDetails.map((item) => (
                <tr key={item.sid}>
                  <td>{item.id}</td>
                  <td>{item.fullname}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.presentaddress}</td>
                  <td>{item.workExperience}</td>
                  <td>{item.password}</td>
                  <td>{item.confirmpassword}</td>
                  <td>{item.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="td-no-data">No technician details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Td;
