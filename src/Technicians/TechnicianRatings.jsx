import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TechnicianRatings.css';

const TechnicianRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState(''); // State for the search input

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/technician-ratings')
      .then((response) => {
        setRatings(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching ratings');
      });
  }, []);

  // Filter ratings based on the Technician ID entered in the search input
  const filteredRatings = ratings.filter((rating) =>
    rating.technician_id.toString().includes(searchId)
  );

  return (
    <div>
      <h2>Technician Ratings and Reviews</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Technician ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '1200px' }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Technician ID</th>
            <th>Customer ID</th>
            <th>Service ID</th>
            <th>Booking ID</th>
            <th>Rating</th>
            <th>Rating Date</th>
            <th>Feedback</th>
            <th>Service Quality</th>
          </tr>
        </thead>
        <tbody>
          {filteredRatings.length > 0 ? (
            filteredRatings.map((rating) => (
              <tr key={`${rating.technician_id}-${rating.customer_id}-${rating.service_id}-${rating.booking_id}`}>
                <td>{rating.technician_id}</td>
                <td>{rating.customer_id}</td>
                <td>{rating.service_id}</td>
                <td>{rating.booking_id}</td>
                <td>{rating.rating}</td>
                <td>{rating.rating_date}</td>
                <td>{rating.feedback}</td>
                <td>{rating.service_quality}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No ratings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TechnicianRatings;
