import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Od.css';

const Od = () => {
  const navigate = useNavigate();
  const [offersDetails, setOffersDetails] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchOffersDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/OffersDetails');
        setOffersDetails(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load offers details' });
      }
    };
    fetchOffersDetails();
  }, []);

  const filteredOffersDetails = offersDetails.filter(item =>
    item.sid.toString().includes(searchText)
  );

  return (
    <div className="od-container">
      <div className="od-button-group">
        <button className="od-btn od-register-btn" onClick={() => navigate('/Register')}>
          Register
        </button>
        <button className="od-btn od-modify-btn" onClick={() => navigate('/Modify')}>
          Modify
        </button>
      </div>

      <div className="od-search-bar">
        <input
          type="text"
          placeholder="Search by Offer ID"
          className="od-search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="od-table-container">
        {errors.general && <p className="od-error">{errors.general}</p>}
        <table className="od-offers-table">
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
            {filteredOffersDetails.length > 0 ? (
              filteredOffersDetails.map((item) => (
                <tr key={item.sid}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>
                    <img src={item.image} alt={item.name} className="od-offer-image" />
                  </td>
                  <td>{item.screen}</td>
                  <td>{item.sid}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="od-no-data">No offer details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Od;
