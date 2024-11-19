import { useState, useEffect } from 'react';
import axios from 'axios';
import './Technician_Dtl.css'; // Updated CSS filename

const Technician_Dtl = () => {
  const [technicians, setTechnicians] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        // Replace with the correct URL or mock data source
        const response = await axios.get('http://localhost:3000/gettechniciandetails');
        setTechnicians(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load technician details' });
      }
    };
    fetchTechnicians();
  }, []);

  return (
    <div className="technician-container">
      {errors.general && <p className="technician-error">{errors.general}</p>}
      <div className="technician-table-container">
        <table className="technician-details-table">
          <thead>
            <tr>
              <th>Technician ID</th>
              <th>Date of Birth</th>
              <th>Job Title</th>
              <th>Skills</th>
              <th>Certifications</th>
              <th>Experience (Years)</th>
              <th>Profile Picture</th>
              <th>Work Hours</th>
              <th>Availability</th>
              <th>Service Area</th>
              <th>Employment Type</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Completed Jobs</th>
              <th>Created Date</th>
              <th>Updated Date</th>
            </tr>
          </thead>
          <tbody>
            {technicians.length > 0 ? (
              technicians.map((technician) => (
                <tr key={technician.technician_id}>
                  <td>{technician.technician_id}</td>
                  <td>{technician.date_of_birth}</td>
                  <td>{technician.job_title}</td>
                  <td>{technician.skills}</td>
                  <td>{technician.certifications}</td>
                  <td>{technician.years_of_experience}</td>
                  <td>
                    <img
                      src={technician.profile_picture_url}
                      alt="Technician Profile"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </td>
                  <td>{technician.work_hours}</td>
                  <td>{technician.availability}</td>
                  <td>{technician.service_area}</td>
                  <td>{technician.employment_type}</td>
                  <td>{technician.status}</td>
                  <td>{technician.rating}</td>
                  <td>{technician.completed_jobs}</td>
                  <td>{new Date(technician.created_date).toLocaleString()}</td>
                  <td>{new Date(technician.updated_date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="technician-no-data">
                  No technician details found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Technician_Dtl;
