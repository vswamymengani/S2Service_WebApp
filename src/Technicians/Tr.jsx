import { useState, useEffect } from 'react';
import axios from 'axios';
import './Tr.css'; // Ensure the CSS file is correctly named and styled

const Tr = () => {
  const [formData, setFormData] = useState({
    id: '',
    fullname: '',
    gender: '',
    email: '',
    mobile: '',
    presentaddress: '',
    workExperience: '',
    password: '',
    confirmpassword: '',
    created_at: ''
  });

  const [errors, setErrors] = useState({});
  const [classes, setClasses] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  // Fetch class details when the component is mounted
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/classDetails');
        setClasses(response.data);
        setClassOptions(response.data.map(cls => ({ label: cls.className, value: cls.className })));
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };

    fetchClasses();
  }, []);

  // Filter sections based on selected class
  useEffect(() => {
    if (formData.className) {
      const filteredSections = classes
        .filter(cls => cls.className === formData.className)
        .flatMap(cls => cls.sections);
      setSectionOptions(filteredSections.map(sec => ({ label: sec, value: sec })));
    } else {
      setSectionOptions([]);
    }
  }, [formData.className, classes]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation checks here if necessary
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
      }
    });

    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.post('http://18.60.190.183:4000/teachers', formData);
      console.log('Form submitted successfully:', response.data);
      // Reset form if successful
      setFormData({
        id: '',
        fullname: '',
        gender: '',
        email: '',
        mobile: '',
        presentaddress: '',
        workExperience: '',
        password: '',
        confirmpassword: '',
        created_at: ''
      });
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <div className="tr-form-container">
      <h2>Teacher Registration Form</h2>
      <form onSubmit={handleSubmit} className="tr-form">
        <div className="tr-form-group">
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter ID"
          />
          {errors.id && <span className="error">{errors.id}</span>}
        </div>
        <div className="tr-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter Full Name"
          />
          {errors.fullname && <span className="error">{errors.fullname}</span>}
        </div>
        <div className="tr-form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div className="tr-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="tr-form-group">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>
        <div className="tr-form-group">
          <label>Present Address</label>
          <textarea
            name="presentaddress"
            value={formData.presentaddress}
            onChange={handleChange}
            placeholder="Enter Present Address"
          />
          {errors.presentaddress && <span className="error">{errors.presentaddress}</span>}
        </div>
        <div className="tr-form-group">
          <label>Work Experience</label>
          <input
            type="text"
            name="workExperience"
            value={formData.workExperience}
            onChange={handleChange}
            placeholder="Enter Work Experience"
          />
          {errors.workExperience && <span className="error">{errors.workExperience}</span>}
        </div>
        <div className="tr-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="tr-form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {errors.confirmpassword && <span className="error">{errors.confirmpassword}</span>}
        </div>
        <div className="tr-form-group">
          <label>Created At</label>
          <input
            type="datetime-local"
            name="created_at"
            value={formData.created_at}
            onChange={handleChange}
          />
          {errors.created_at && <span className="error">{errors.created_at}</span>}
        </div>
        <button type="submit" className="tr-form-submit">Register</button>
      </form>
    </div>
  );
};

export default Tr;
