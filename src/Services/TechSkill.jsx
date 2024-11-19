import { useState, useEffect } from 'react';
import axios from 'axios';
import './TechSkill.css'; // Assuming you have styles defined in this file

const TechSkill = () => {
  const [techSkills, setTechSkills] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTechSkills = async () => {
      try {
        // Replace with your actual API URL to fetch technician skills
        const response = await axios.get('http://localhost:3000/gettechskills');
        setTechSkills(response.data);
      } catch (err) {
        setErrors({ general: 'Failed to load technician skills' });
      }
    };
    fetchTechSkills();
  }, []);

  return (
    <div className="techskill-container">
      {errors.general && <p className="techskill-error">{errors.general}</p>}
      <div className="techskill-table-container">
        <table className="techskill-details-table">
          <thead>
            <tr>
              <th>Skill ID</th>
              <th>Technician ID</th>
              <th>Skill Name</th>
              <th>Skill Level</th>
              <th>Certified</th>
            </tr>
          </thead>
          <tbody>
            {techSkills.length > 0 ? (
              techSkills.map((item) => (
                <tr key={item.skill_id}>
                  <td>{item.skill_id}</td>
                  <td>{item.technician_id}</td>
                  <td>{item.skill_name}</td>
                  <td>{item.skill_level}</td>
                  <td>{item.certified === '1' ? 'Yes' : 'No'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="techskill-no-data">No technician skill details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechSkill;
