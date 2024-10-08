import { useState, useEffect } from 'react';
import axios from 'axios';
import './Td.css'; // Assuming you have styles defined in this file

const Td = () => {
  const [techniciansDetails, setTechniciansDetails] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTechniciansDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/gettechnicians');
        setTechniciansDetails(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load technician details' });
      }
    };
    fetchTechniciansDetails();
  }, []);

  return (
    <div className="td-container">
      {errors.general && <p className="td-error">{errors.general}</p>}
      <div className="td-table-container">
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
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {techniciansDetails.length > 0 ? (
              techniciansDetails.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fullname}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.presentaddress}</td>
                  <td>{item.workExperience}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="td-no-data">No technician details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Td;
