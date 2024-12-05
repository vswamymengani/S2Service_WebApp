import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TechServiceList.css';

const TechServiceList = () => {
  const [formData, setFormData] = useState({
    id: '',
    category: '',
    subcategory: '',
    listofcategory: '',
    techservice: '',
    tsid: '',
  });
  const [serviceDetails, setServiceDetails] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch service details
  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getservices');
      setServiceDetails(response.data);
    } catch (err) {
      setErrors({ general: 'Failed to load service details' });
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Update service
      try {
        await axios.put(`http://localhost:3000/updateservice/${editId}`, formData);
        setFormData({
          id: '',
          category: '',
          subcategory: '',
          listofcategory: '',
          techservice: '',
          tsid: '',
        });
        setIsEditMode(false);
        setEditId(null);
        fetchServiceDetails();
      } catch (err) {
        setErrors({ general: 'Failed to update service details' });
      }
    } else {
      // Add service
      try {
        await axios.post('http://localhost:3000/addservice', formData);
        setFormData({
          id: '',
          category: '',
          subcategory: '',
          listofcategory: '',
          techservice: '',
          tsid: '',
        });
        fetchServiceDetails();
      } catch (err) {
        setErrors({ general: 'Failed to add service details' });
      }
    }
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      category: item.category,
      subcategory: item.subcategory,
      listofcategory: item.listofcategory,
      techservice: item.techservice,
      tsid: item.tsid,
    });
    setIsEditMode(true);
    setEditId(item.id);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteservice/${id}`);
      fetchServiceDetails();
    } catch (err) {
      setErrors({ general: 'Failed to delete service' });
    }
  };

  return (
    <div className="service-manager">
      <h1>Service Management</h1>

      {/* Form Section */}
      <div className="service-form-section">
        <h2>{isEditMode ? 'Update Service' : 'Add Service'}</h2>
        {errors.general && <p className="error">{errors.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="ID"
              required
              disabled={isEditMode} // ID is not editable in update mode
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
            />
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              placeholder="Subcategory"
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="listofcategory"
              value={formData.listofcategory}
              onChange={handleInputChange}
              placeholder="List of Category"
              required
            />
            <input
              type="text"
              name="techservice"
              value={formData.techservice}
              onChange={handleInputChange}
              placeholder="Tech Service"
              required
            />
            <input
              type="text"
              name="tsid"
              value={formData.tsid}
              onChange={handleInputChange}
              placeholder="TSID"
              required
            />
          </div>
          <button type="submit">{isEditMode ? 'Update Service' : 'Add Service'}</button>
        </form>
      </div>

      {/* Table Section */}
      <div className="service-list-section">
        <h2>Service List</h2>
        <div className="td-table-container">
          <table className="td-service-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>List of Category</th>
                <th>Tech Service</th>
                <th>TSID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceDetails.length > 0 ? (
                serviceDetails.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category}</td>
                    <td>{item.subcategory}</td>
                    <td>{item.listofcategory}</td>
                    <td>{item.techservice}</td>
                    <td>{item.tsid}</td>
                    <td>
                    <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
<button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="td-no-data">No service details found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TechServiceList;
