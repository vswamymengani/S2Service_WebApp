import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Sd.css';

const Sd = () => {
  const navigate = useNavigate();
  const [ServicesDetails, setServicesDetails] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchServicesDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ServicesDetails');
        setServicesDetails(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load student details' });
      }
    };
    fetchServicesDetails();
  }, []);

  const filteredServicesDetails = ServicesDetails.filter(item =>
    item.sid.toString().includes(searchText)
  );

  return (
    <div className="sd-container">
      <div className="sd-button-group">
        <button className="sd-btn sd-register-btn" onClick={() => navigate('/Register')}>
          Register
        </button>
        <button className="sd-btn sd-modify-btn" onClick={() => navigate('/modify')}>
          Modify
        </button>
      </div>

      <div className="sd-search-bar">
        <input
          type="text"
          placeholder="Search by Student ID"
          className="sd-search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="sd-table-container">
        {errors.general && <p className="sd-error">{errors.general}</p>}
        <table className="sd-student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Screen</th>
              <th>SID</th>
            </tr>
          </thead>
          <tbody>
            {filteredServicesDetails.length > 0 ? (
              filteredServicesDetails.map((item) => (
                <tr key={item.sid}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td><img src={item.image} alt={item.name} className="sd-student-image" /></td>
                  <td>{item.screen}</td>
                  <td>{item.sid}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="sd-no-data">No student details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sd;
