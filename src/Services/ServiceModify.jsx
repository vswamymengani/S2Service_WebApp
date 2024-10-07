import { useState } from 'react';
import axios from 'axios';
import './ServiceModify.css';
import { useNavigate } from 'react-router-dom';

const ServiceModify = () => {
  const [id, setId] = useState('');
  const [serviceData, setServiceData] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchServiceData = async () => {
    try {
      const response = await axios.get(`http://18.60.190.183:3000/service/${id}`);
      if (response.status === 200) {
        setServiceData(response.data);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!serviceData.name?.trim()) newErrors.name = 'Name is required';
    if (!serviceData.category?.trim()) newErrors.category = 'Category is required';
    if (!serviceData.image?.trim()) newErrors.image = 'Image URL is required';
    if (!serviceData.screen?.trim()) newErrors.screen = 'Screen is required';
    if (!serviceData.sid?.trim()) newErrors.sid = 'SID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModify = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put(`http://18.60.190.183:3000/service/${id}`, serviceData);
        if (response.status === 200) {
          navigate(`/service-details`);
          alert("Details modified successfully");
        } else {
          console.error('Failed to modify data:', response.status);
        }
      } catch (error) {
        console.error('Axios Error:', error);
      }
    }
  };

  const handleChange = (name, value) => {
    setServiceData({ ...serviceData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  return (
    <div className="service-form-container">
      <div className="service-form-content">
        <div className="service-form-input-group">
          <input
            className="service-input"
            type="text"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="service-button enter-button" onClick={fetchServiceData}>Enter</button>
        </div>
        {serviceData && (
          <div className="service-grid">
            <div className="service-grid-item">
              <input
                className="service-input"
                type="text"
                placeholder="Name"
                value={serviceData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <p className="service-error">{errors.name}</p>}
            </div>
            <div className="service-grid-item">
              <input
                className="service-input"
                type="text"
                placeholder="Category"
                value={serviceData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              />
              {errors.category && <p className="service-error">{errors.category}</p>}
            </div>
            <div className="service-grid-item">
              <input
                className="service-input"
                type="text"
                placeholder="Image URL"
                value={serviceData.image}
                onChange={(e) => handleChange('image', e.target.value)}
              />
              {errors.image && <p className="service-error">{errors.image}</p>}
            </div>
            <div className="service-grid-item">
              <input
                className="service-input"
                type="text"
                placeholder="Screen"
                value={serviceData.screen}
                onChange={(e) => handleChange('screen', e.target.value)}
              />
              {errors.screen && <p className="service-error">{errors.screen}</p>}
            </div>
            <div className="service-grid-item">
              <input
                className="service-input"
                type="text"
                placeholder="SID"
                value={serviceData.sid}
                onChange={(e) => handleChange('sid', e.target.value)}
              />
              {errors.sid && <p className="service-error">{errors.sid}</p>}
            </div>
            <div className="service-button-container">
              <button className="service-button modify-button" onClick={handleModify}>Modify</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceModify;
