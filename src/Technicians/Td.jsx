import { useState, useEffect } from 'react';
import axios from 'axios';
import logoImg from '../assets/slogo.png';
import './Td.css'; // Assuming you have styles defined in this file

const Td = () => {
  const [techniciansDetails, setTechniciansDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchType, setSearchType] = useState(''); // State for search type selection
  const [selectedValue, setSelectedValue] = useState(''); // State for selected ID or Mobile

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

  // Extract unique IDs and Mobile Numbers for dropdown options
  const uniqueIds = [...new Set(techniciansDetails.map((item) => item.id))];
  const uniqueMobiles = [...new Set(techniciansDetails.map((item) => item.mobile))];

  // Filter technicians based on selected ID or Mobile Number
  const filteredTechnicians = techniciansDetails.filter((item) => {
    if (!selectedValue) return true;
    if (searchType === 'ID') return item.id.toString() === selectedValue;
    if (searchType === 'Mobile') return item.mobile === selectedValue;
    return true;
  });

  return (
<div>
    <div className="technicians-images-container1">
    <img src={logoImg} alt="School Logo" className="technicians-logo1" />
  </div>

    <div className="td-container1">
      {errors.general && <p className="td-error">{errors.general}</p>}
      
      {/* Search Type Selection Dropdown */}
      <div className="td-search-container">
        <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
            setSelectedValue(''); // Reset selected value when search type changes
          }}
          className="td-search-select"
        >
          <option value="">Select Search Type</option>
          <option value="ID">Search by ID</option>
          <option value="Mobile">Search by Mobile</option>
        </select>

        {/* Conditional Dropdown for ID or Mobile based on Search Type */}
        {searchType && (
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="td-search-select"
          >
            <option value="">
              {searchType === 'ID' ? 'Select ID' : 'Select Mobile Number'}
            </option>
            {searchType === 'ID' &&
              uniqueIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            {searchType === 'Mobile' &&
              uniqueMobiles.map((mobile) => (
                <option key={mobile} value={mobile}>
                  {mobile}
                </option>
              ))}
          </select>
        )}
      </div>

      {/* Table Display */}
      <div className="td-table-container1">
        <table className="td-technician-table1">
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
            {filteredTechnicians.length > 0 ? (
              filteredTechnicians.map((item) => (
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
                <td colSpan="8" className="td-no-data">
                  No technician details found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Td;
