import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TechniciansTable.css';
import { useNavigate } from 'react-router-dom';
const TechniciansTable = () => {
  const [technicians, setTechnicians] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  // State for editing
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [editFormData, setEditFormData] = useState({
    technicianName: '',
    technicianID: '',
    profilePicture: '',
    totalServicesCompleted: '',
    pendingServices: '',
    avgCompletionTime: '',
    lastServiceDate: '',
    avgCustomerRating: '',
    numberOfReviews: '',
    positiveFeedbackPercent: '',
    negativeFeedbackPercent: '',
    serviceCategories: '',
    servicesOverTime: '',
    avgResponseTime: '',
    reworkPercentage: '',
    complaints: '',
    performanceStats: '',
    activeHours: '',
    idleHours: ''
  });

  // State for adding
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormData, setAddFormData] = useState({
    technicianName: '',
    technicianID: '',
    profilePicture: '',
    totalServicesCompleted: '',
    pendingServices: '',
    avgCompletionTime: '',
    lastServiceDate: '',
    avgCustomerRating: '',
    numberOfReviews: '',
    positiveFeedbackPercent: '',
    negativeFeedbackPercent: '',
    serviceCategories: '',
    servicesOverTime: '',
    avgResponseTime: '',
    reworkPercentage: '',
    complaints: '',
    performanceStats: '',
    activeHours: '',
    idleHours: ''
  });

  // Fetch technicians from the API
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/technicians');
        setTechnicians(response.data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };

    fetchTechnicians();
  }, []);

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/technicians/${id}`);
      setTechnicians(technicians.filter((tech) => tech.technicianID !== id));
    } catch (err) {
      setError('Error deleting technician');
      console.error(err);
    }
  };

  // Handle edit button click
  const handleEdit = (tech) => {
    setEditingTechnician(tech.technicianID);
    setEditFormData({ ...tech });
  };

  // Navigate to the add technician page
  const handleAddTechnician = () => {
    navigate('/TechnicianForm');  // Navigates to the add form
  };
  // Handle update submission
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/technicians/${editingTechnician}`, editFormData);
      setTechnicians((prev) =>
        prev.map((tech) =>
          tech.technicianID === editingTechnician ? { ...tech, ...editFormData } : tech
        )
      );
      setEditingTechnician(null);
    } catch (err) {
      setError('Error updating technician');
      console.error(err);
    }
  };

  // Handle input changes for add form
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({ ...addFormData, [name]: value });
  };

  // Handle add submission
  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/technicians', addFormData);
      setTechnicians([...technicians, response.data]);
      setShowAddForm(false);
      setAddFormData({
        technicianName: '',
        technicianID: '',
        profilePicture: '',
        totalServicesCompleted: '',
        pendingServices: '',
        avgCompletionTime: '',
        lastServiceDate: '',
        avgCustomerRating: '',
        numberOfReviews: '',
        positiveFeedbackPercent: '',
        negativeFeedbackPercent: '',
        serviceCategories: '',
        servicesOverTime: '',
        avgResponseTime: '',
        reworkPercentage: '',
        complaints: '',
        performanceStats: '',
        activeHours: '',
        idleHours: ''
      });
    } catch (err) {
      setError('Error adding technician');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Technicians List</h2>
      {error && <p className="error">{error}</p>}

      <button onClick={handleAddTechnician} className="add-btn">
  Add Technician
</button>
      <table className="technicians-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Profile Picture</th>
            <th>Total Services Completed</th>
            <th>Pending Services</th>
            <th>Avg Completion Time</th>
            <th>Last Service Date</th>
            <th>Avg Customer Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((tech) => (
            <tr key={tech.technicianID}>
              <td>{tech.technicianID}</td>
              <td>{tech.technicianName}</td>
              <td>
                <img
                  src={`http://localhost:5000/${tech.profilePicture}`}
                  alt={tech.technicianName}
                  className="profile-pic"
                />
              </td>
              <td>{tech.totalServicesCompleted}</td>
              <td>{tech.pendingServices}</td>
              <td>{tech.avgCompletionTime} hours</td>
              <td>{tech.lastServiceDate}</td>
              <td>{tech.avgCustomerRating}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(tech)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(tech.technicianID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default TechniciansTable;
