import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './S2sServicesForm.css';

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    listofcategory: '',
    servicename: '',
    warranty: '',
    rating: '',
    reviews: '',
    price: '',
    description: '',
  });
  const [serviceImage, setServiceImage] = useState(null);
  const [serviceVideo, setServiceVideo] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' }); // State for alert message
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/s2sservices');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setServiceImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setServiceVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('listofcategory', formData.listofcategory);
    data.append('servicename', formData.servicename);
    data.append('warranty', formData.warranty);
    data.append('rating', formData.rating);
    data.append('reviews', formData.reviews);
    data.append('price', formData.price);
    data.append('description', formData.description);

    if (serviceImage) {
      data.append('serviceimage', serviceImage);
    }
    if (serviceVideo) {
      data.append('servicevideos', serviceVideo);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/s2sservices', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlert({ message: response.data.message, type: 'success' }); // Set alert message on success
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error uploading service:', error.response?.data || error.message);
      setAlert({ message: 'Failed to upload service', type: 'error' }); // Set alert message on error
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('listofcategory', formData.listofcategory);
    data.append('servicename', formData.servicename);
    data.append('warranty', formData.warranty);
    data.append('rating', formData.rating);
    data.append('reviews', formData.reviews);
    data.append('price', formData.price);
    data.append('description', formData.description);

    if (serviceImage) {
      data.append('serviceimage', serviceImage);
    }
    if (serviceVideo) {
      data.append('servicevideos', serviceVideo);
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/s2sservices/${editingServiceId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlert({ message: response.data.message, type: 'success' }); // Set alert message on success
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error updating service:', error.response?.data || error.message);
      setAlert({ message: 'Failed to update service', type: 'error' }); // Set alert message on error
    }
  };

  const resetForm = () => {
    setFormData({
      listofcategory: '',
      servicename: '',
      warranty: '',
      rating: '',
      reviews: '',
      price: '',
      description: '',
    });
    setServiceImage(null);
    setServiceVideo(null);
    setEditingServiceId(null);
    setAlert({ message: '', type: '' }); // Reset alert message
  };

  const handleEdit = (service) => {
    setFormData({
      listofcategory: service.listofcategory,
      servicename: service.servicename,
      warranty: service.warranty,
      rating: service.rating,
      reviews: service.reviews,
      price: service.price,
      description: service.description,
    });
    setEditingServiceId(service.id);
  };

  return (
    <div className="service-form-container">
      <h2>{editingServiceId ? 'Edit Service' : 'Add New Service'}</h2>
      <form onSubmit={editingServiceId ? handleUpdate : handleSubmit}>
        {/* Form Inputs */}
        <div>
          <label>List of Category:</label>
          <input
            type="text"
            name="listofcategory"
            value={formData.listofcategory}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Service Name:</label>
          <input
            type="text"
            name="servicename"
            value={formData.servicename}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Warranty:</label>
          <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            step="0.01"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reviews:</label>
          <input
            type="number"
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            step="0.01"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Service Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <label>Service Video:</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </div>
        <button type="submit">{editingServiceId ? 'Update Service' : 'Add Service'}</button>
      </form>

      {/* Alert Message */}
      {alert.message && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* Displaying the list of services */}
      <div className="services-list">
        <h3>All Services</h3>
        {services.length > 0 ? (
          <div className="card-container">
            {services.map((service) => (
              <div key={service.id} className="service-card" onClick={() => handleEdit(service)}>
                <h4>{service.servicename}</h4>
                <p><strong>Price:</strong> ${service.price}</p>
                <p><strong>Rating:</strong> {service.rating}</p>
                <p><strong>Reviews:</strong> {service.reviews}</p>
                <p><strong>Description:</strong> {service.description}</p>
                {service.serviceimage && (
                  <img
                    src={service.serviceimage}
                    alt={service.servicename}
                    className="service-image"
                  />
                )}
                {service.servicevideos && (
                  <video className="service-video" width="200" controls>
                    <source src={service.servicevideos} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </div>
  );
};

export default AddServiceForm;
