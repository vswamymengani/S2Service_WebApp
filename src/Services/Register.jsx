import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Register.css'; // Renamed CSS file

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    className: '',
    section: '',
    rollNo: '',
    dateofbirth: '',
    fatherName: '',
    fatherNo: '',
    motherName: '',
    motherNo: '',
    admissionid: '',
    presentAddress: '',
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [classes, setClasses] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const photoInputRef = useRef(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/classDetails');
        const classData = response.data;
        setClasses(classData);
        setClassOptions(classData.map(cls => ({ label: cls.className, value: cls.className })));
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };

    fetchClasses();
  }, []);

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.fullname.trim()) formErrors.fullname = 'Full Name is required';
    if (!formData.className) formErrors.className = 'Class is required';
    if (!formData.section.trim()) formErrors.section = 'Section is required';
    if (!formData.rollNo) formErrors.rollNo = 'Roll No is required';
    if (!formData.dateofbirth) formErrors.dateofbirth = 'Date of Birth is required';
    if (!formData.fatherName.trim()) formErrors.fatherName = "Father's Name is required";
    if (!formData.fatherNo.match(/^\d{10}$/)) formErrors.fatherNo = "Father's Mobile must be 10 digits";
    if (!formData.motherName.trim()) formErrors.motherName = "Mother's Name is required";
    if (!formData.motherNo.match(/^\d{10}$/)) formErrors.motherNo = "Mother's Mobile must be 10 digits";
    if (!formData.admissionid.trim()) formErrors.admissionid = 'Admission ID is required';
    if (!formData.presentAddress.trim()) formErrors.presentAddress = 'Present Address is required';
    if (!formData.photo) formErrors.photo = 'Profile Picture is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const formatDateForSubmission = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const resetForm = () => {
    setFormData({
      fullname: '',
      className: '',
      section: '',
      rollNo: '',
      dateofbirth: '',
      fatherName: '',
      fatherNo: '',
      motherName: '',
      motherNo: '',
      admissionid: '',
      presentAddress: '',
      photo: null,
    });
    setErrors({});
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        const admissionCheckResponse = await axios.get(`http://18.60.190.183:3000/checkAdmissionId/${formData.admissionid}`);
        if (admissionCheckResponse.data.exists) {
          alert('Admission number already used. Please use a different one.');
          return;
        }

        const rollNoCheckResponse = await axios.get(`http://18.60.190.183:3000/checkRollNo/${formData.className}/${formData.section}/${formData.rollNo}`);
        if (rollNoCheckResponse.data.exists) {
          alert('Roll number already exists for the selected class and section. Please choose a different one.');
          return;
        }
  
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          if (key === 'dateofbirth') {
            formDataToSend.append(key, formatDateForSubmission(formData[key]));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });
  
        const response = await axios.post('http://18.60.190.183:3000/adminStudentRegister', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          alert('Registered Successfully!');
          resetForm();
        } else {
          console.error('Failed to register:', response.status);
        }
      } catch (error) {
        console.error('Registration Error:', error);
      }
    }
  };

  const handleRefresh = () => {
    resetForm();
    window.location.reload();
  };

  return (
    <div className="student-register-container">
      <form className="student-register-form" onSubmit={handleSubmit}>
        <h2>Student Registration Form</h2>

        {/* Profile Picture Upload */}
        <div className="profile-picture-container">
          <label htmlFor="photo" className="profile-picture-label">
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              ref={photoInputRef}
            />
            <div className="profile-picture">
              {formData.photo ? (
                <img src={URL.createObjectURL(formData.photo)} alt="Profile" />
              ) : (
                <span>Upload your profile</span>
              )}
            </div>
          </label>
          {errors.photo && <span className="error">{errors.photo}</span>}
        </div>

        <div className="student-form-row">
          <div className="student-form-group">
            <label>Full Name <span className="required">*</span></label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <span className="error">{errors.fullname}</span>}
          </div>

          <div className="student-form-group">
            <label>Class <span className="required">*</span></label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
            >
              <option value="">Select Class</option>
              {classOptions.map((cls) => (
                <option key={cls.value} value={cls.value}>{cls.label}</option>
              ))}
            </select>
            {errors.className && <span className="error">{errors.className}</span>}
          </div>

          <div className="student-form-group">
            <label>Section <span className="required">*</span></label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
            >
              <option value="">Select Section</option>
              {sectionOptions.map((section) => (
                <option key={section.value} value={section.value}>{section.label}</option>
              ))}
            </select>
            {errors.section && <span className="error">{errors.section}</span>}
          </div>
        </div>

        <div className="student-form-row">
          <div className="student-form-group">
            <label>Roll No <span className="required">*</span></label>
            <input
              type="number"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
            />
            {errors.rollNo && <span className="error">{errors.rollNo}</span>}
          </div>

          <div className="student-form-group">
            <label>Date of Birth <span className="required">*</span></label>
            <input
              type="date"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleChange}
            />
            {errors.dateofbirth && <span className="error">{errors.dateofbirth}</span>}
          </div>

          <div className="student-form-group">
            <label>Father's Name <span className="required">*</span></label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
            {errors.fatherName && <span className="error">{errors.fatherName}</span>}
          </div>
        </div>

        <div className="student-form-row">
          <div className="student-form-group">
            <label>Father's Mobile No <span className="required">*</span></label>
            <input
              type="text"
              name="fatherNo"
              value={formData.fatherNo}
              onChange={handleChange}
            />
            {errors.fatherNo && <span className="error">{errors.fatherNo}</span>}
          </div>

          <div className="student-form-group">
            <label>Mother's Name <span className="required">*</span></label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />
            {errors.motherName && <span className="error">{errors.motherName}</span>}
          </div>

          <div className="student-form-group">
            <label>Mother's Mobile No <span className="required">*</span></label>
            <input
              type="text"
              name="motherNo"
              value={formData.motherNo}
              onChange={handleChange}
            />
            {errors.motherNo && <span className="error">{errors.motherNo}</span>}
          </div>
        </div>

        <div className="student-form-row">
          <div className="student-form-group">
            <label>Admission ID <span className="required">*</span></label>
            <input
              type="text"
              name="admissionid"
              value={formData.admissionid}
              onChange={handleChange}
            />
            {errors.admissionid && <span className="error">{errors.admissionid}</span>}
          </div>

          <div className="student-form-group">
            <label>Present Address <span className="required">*</span></label>
            <textarea
             style={{ height: '80px' }}
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
            ></textarea>
            {errors.presentAddress && <span className="error">{errors.presentAddress}</span>}
          </div>
        </div>
     <center>
        <div className="student-form-buttons">
  <button type="submit" style={{ width: '120px', marginRight: '10px' }}>Register</button> {/* Adjust width and margin */}
  <button type="button" onClick={handleRefresh} style={{ width: '120px' }}>Refresh</button>
</div></center>

      </form>
    </div>
  );
};

export default StudentRegister;
