import  { useState, useEffect } from 'react';
import axios from 'axios';
import './S2sServicesForm.css';

const ServiceManagementForm = () => {
  const [formData, setFormData] = useState({
    listofcategory: '',
    servicename: '',
    warranty: '',
    rating: '',
    reviews: '',
    price: '',
    description: '',
    srid: '',
  });
  const [serviceImage, setServiceImage] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [success, setSuccess] = useState(''); 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    const data = new FormData();
    data.append('listofcategory', formData.listofcategory);
    data.append('servicename', formData.servicename);
    data.append('warranty', formData.warranty);
    data.append('rating', formData.rating);
    data.append('reviews', formData.reviews);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('srid', formData.srid); 

    if (serviceImage) {
      data.append('serviceimage', serviceImage);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/s2sservices', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Service added successfully!'); 
      setTimeout(() => setSuccess(''), 3000); 
      fetchServices();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.status === 409 ? 'Service name must be unique' : 'Failed to add service');
      setAlert({ message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false); 
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    const data = new FormData();
    data.append('listofcategory', formData.listofcategory);
    data.append('servicename', formData.servicename);
    data.append('warranty', formData.warranty);
    data.append('rating', formData.rating);
    data.append('reviews', formData.reviews);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('srid', formData.srid); 

    const existingService = services.find(service => service.id === editingServiceId);
    const existingImageUrl = existingService?.serviceimage;

    if (serviceImage) {
      data.append('serviceimage', serviceImage);
    } else {
      data.append('serviceimage', existingImageUrl);
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/s2sservices/${editingServiceId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Service updated successfully!'); 
      setTimeout(() => setSuccess(''), 3000); 
      fetchServices();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.status === 409 ? 'Service name must be unique' : 'Failed to update service');
      setAlert({ message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/s2sservices/${id}`);
      setSuccess('Service deleted successfully!'); 
      setTimeout(() => setSuccess(''), 3000); 
      fetchServices();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete service';
      setAlert({ message: errorMessage, type: 'error' });
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
      srid: '', 
    });
    setServiceImage(null);
    setEditingServiceId(null);
    setAlert({ message: '', type: '' });
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
      srid: service.srid, 
    });
    setEditingServiceId(service.id);
  };

  return (
    <div>
    <div className="service-management-container">
      <h2>{editingServiceId ? 'Edit Service' : 'Add New Service'}</h2>
      <form onSubmit={editingServiceId ? handleUpdate : handleSubmit}>
        <div className="service-form-field">
          <label>List of Category:</label>
          <input
            type="text"
            name="listofcategory"
            value={formData.listofcategory}
            onChange={handleChange}
            required
          />
        </div>
        <div className="service-form-field">
          <label>Service Name:</label>
          <input
            type="text"
            name="servicename"
            value={formData.servicename}
            onChange={handleChange}
            required
          />
        </div>
        <div className="service-form-field">
          <label>Warranty:</label>
          <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            required
          />
        </div>
        <div className="service-form-field">
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
        <div className="service-form-field">
          <label>Reviews:</label>
          <input
            type="number"
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
            required
          />
        </div>
        <div className="service-form-field">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="service-form-field">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="service-form-field">
          <label>SRID:</label>
          <input
            type="text"
            name="srid"
            value={formData.srid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="service-form-field">
          <label>Service Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!editingServiceId}
          />
        </div>
        {isLoading ? <p>Loading...</p> : <button type="submit">{editingServiceId ? 'Update' : 'Add'} Service</button>}
      </form>
      {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
      {success && <div className="success-message">{success}</div>} 
     
    </div>
     <h3>Existing Services</h3>
     <div className="service-card-wrapper">
       {services.map((service) => (
         <div className="service-card" key={service.id}>
           <h4>{service.servicename}</h4>
           <p>Category: {service.listofcategory}</p>
           <p>Warranty: {service.warranty}</p>
           <p>Rating: {service.rating}</p>
           <p>Reviews: {service.reviews}</p>
           <p>Price: {service.price}</p>
           <p>Description: {service.description}</p>
           <p>SRID: {service.srid}</p>
           {service.serviceimage && <img src={service.serviceimage} alt={service.servicename} />}
           <div className="service-card-buttons">
             <button onClick={() => handleEdit(service)}>Edit</button>
             <button onClick={() => handleDelete(service.id)}>Delete</button>
           </div>
         </div>
       ))}
     </div>
     </div>
  );
};

export default ServiceManagementForm;
