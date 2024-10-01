import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../sms images/calander.png';
import img1 from '../assets/interactions (1).png';
import img2 from '../assets/technician (1).png';
import img3 from '../assets/saas (1).png';
import img4 from '../assets/offering (1).png';
import img5 from '../assets/image-split-testing (1).png';
import img6 from '../sms images/gallary1.png';
import img7 from '../sms images/classwork.png';
import img8 from '../sms images/classwork.png';
import sclimg from '../assets/slogo.png';
import sclimg1 from '../sms images/scllogo1.jpg';
import './Home.css';


const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const navigate = useNavigate();


  const handleHomeClick = () => {
    navigate('/Login');
  };

  const handleLogoutClick = () => {
    navigate('/Login');
  };

  const handleStudentClick = () => {
    navigate('/student');
  };

  const handleTeacherClick = () => {
    navigate('/teacher');
  };

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handleTimeTableClick = () => {
    navigate('/timetable');
  };

  const handleAdminLibraryClick = () => {
    navigate('/AdminLibrary');
  };

  const handleEventsClick = () => {
    navigate('/events');
  };

  const handleClassesClick = () => {
    navigate('/classes');
  };

  const handleTeacherAttendanceClick = () => {
    navigate('/TeacherAttendance');
  };

  useEffect(() => {
    axios.get('http://localhost:3000/studentCount')
      .then(response => setStudentCount(response.data.Student_Count))
      .catch(error => console.error('Error fetching student count:', error));

    axios.get('http://localhost:3000/teacherCount')
      .then(response => setTeacherCount(response.data.Teacher_Count))
      .catch(error => console.error('Error fetching teacher count:', error));
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Add the centered h1 text */}
      <h1 className="dashboard-title">Dashboard-S2SERVICE</h1>
      <div className="dashboard-container">

  <img src={sclimg} alt="School" className="school-img1" />
  <img src={sclimg1} alt="School Logo" className="school-logo-img1" />
</div>


        
      {/* <div className="image-container"> */}
        {/* <div className="school-img-container1">
          <img src={sclimg} alt="School" className="school-img1" />
        </div> */}
        {/* <img src={sclimg1} alt="School Logo" className="school-logo-img1" /> */}
      {/* </div> */}


      <div className="card-grid">
        <div className="dashboard-card" onClick={handleStudentClick}>
          <img src={img1} alt="Students" className="dashboard-img" />
          <h3>Customers</h3>
        </div>
        <div className="dashboard-card" onClick={handleTeacherClick}>
          <img src={img2} alt="Teachers" className="dashboard-img" />
          <h3>Technicians</h3>
        </div>
        <div className="dashboard-card" onClick={handleCalendarClick}>
          <img src={img3} alt="Calendar" className="dashboard-img" />
          <h3>Services</h3>
        </div>
        <div className="dashboard-card" onClick={handleTimeTableClick}>
          <img src={img4} alt="Timetable" className="dashboard-img" />
          <h3>Offers</h3>
        </div>
        <div className="dashboard-card" onClick={handleAdminLibraryClick}>
          <img src={img5} alt="Library" className="dashboard-img" />
          <h3>Images</h3>
        </div>
        <div className="dashboard-card" onClick={handleEventsClick}>
          <img src={img6} alt="Events" className="dashboard-img" />
          <h3>Events</h3>
        </div>
        <div className="dashboard-card" onClick={handleClassesClick}>
          <img src={img7} alt="Classes" className="dashboard-img" />
          <h3>Classes</h3>
        </div>
        <div className="dashboard-card" onClick={handleTeacherAttendanceClick}>
          <img src={img8} alt="Teacher Attendance" className="dashboard-img" />
          <h3>Teacher Attendance</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;