import { useState, useEffect } from 'react';
import axios from 'axios';
import './TechAvailability.css'; // Assuming you have styles defined in this file

const TechAvailability = () => {
  const [techAvailability, setTechAvailability] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTechAvailability = async () => {
      try {
        // Replace with your actual API URL to fetch technician availability
        const response = await axios.get('http://localhost:3000/gettechavailability');
        setTechAvailability(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load technician availability' });
      }
    };
    fetchTechAvailability();
  }, []);

  return (
    <div className="techavailability-container">
      {errors.general && <p className="techavailability-error">{errors.general}</p>}
      <div className="techavailability-table-container">
        <table className="techavailability-details-table">
          <thead>
            <tr>
              <th>Availability ID</th>
              <th>Technician ID</th>
              <th>Day of Week</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {techAvailability.length > 0 ? (
              techAvailability.map((item) => (
                <tr key={item.availability_id}>
                  <td>{item.availability_id}</td>
                  <td>{item.id}</td>
                  <td>{item.day_of_week}</td>
                  <td>{item.start_time}</td>
                  <td>{item.end_time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="techavailability-no-data">No technician availability details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechAvailability;
