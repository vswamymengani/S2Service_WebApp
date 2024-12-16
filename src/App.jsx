import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'; // Import the Login component
import Home from './Components/Home'; // Import the Home component
import Sidebar from './Components/Sidebar'; // Import the Sidebar component
import Customers from './Components/Customers/Customers';
import Services from './Services/Services';
import Sd from './Services/Sd';
import Register from './Services/Register';
import Technicians from './Technicians/Technicians';
import Tr from './Technicians/Tr';
import Td from './Technicians/Td';
import Offers from './Offers/Offers'
// import Images from './Images/Images';
import ServiceRequestForm from './ServiceRequestForm/ServiceForm';
import Cd from './Components/Customers/Cd';
import Od from './Offers/Od';
import Events from './ServiceRequestForm/Events';
import ServiceModify from './Services/ServiceModify';
import Customerregister from './Components/Customers/Customerregister';
import Home1 from './Services/Home1';
import S2sCategoriesForm from './Services/S2sCategoriesForm';
import S2sServicesForm from './Services/S2sServicesForm';
import S2sSubcategoriesForm from './Services/S2sSubcategoriesForm';
import CartTable from './Services/CartTable';
import Transaction_Dtl from './Services/Transaction_Dtl';
import Technician_Dtl from './Services/Technician_Dtl'; 
import TechSkill from './Services/TechSkill';
import TechAvailability from './Services/TechAvailability';
import TechServiceList from './Technicians/TechServiceList';
import SupportForm from './Components/Customers/SupportForm';
import TechnicianForm from './Technicians/TechnicianForm';
import ServiceBookingForm from './Services/ServiceBookingForm';
import CustomerBooking from './Components/Customers/CustomerBooking';
import BookingForm from './Components/Customers/BookingForm';
import CustomerFeedbackForm from './Components/Customers/CustomerFeedbacl';
import ServiceForm from './ServiceRequestForm/ServiceForm';
import ServiceHistory from './ServiceRequestForm/ServiceHistory';
import TechnicianRatings from './Technicians/TechnicianRatings';
import TechniciansTable from './Technicians/TechniciansTable';

function SidebarWrapper({ children }) {
  const location = useLocation();

  // List of paths where Sidebar should not be displayed
  const hideSidebarPaths = ["/", "/Login"];

  // Check if current path is in the list of paths to hide the sidebar
  const showSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <>
      {showSidebar && <Sidebar />}
      {children}
    </>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        {/* Wrap your routes inside SidebarWrapper */}
        <SidebarWrapper>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Customers" element={<Customers />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Sd" element={<Sd />} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/Technicians" element={<Technicians/>} />
            <Route path="/Tr" element={<Tr/>} />
            <Route path="/Td" element={<Td/>} />
            <Route path="/Offers" element={<Offers/>} />
            {/* <Route path="/Images" element={<Images/>} /> */}
            <Route path="/ServiceRequestForm" element={<ServiceRequestForm/>} />
            <Route path="/Cd" element={<Cd/>} />
            <Route path="/Od" element={<Od/>} />
            <Route path="/Events" element={<Events/>} />
            <Route path="/ServiceModify" element={<ServiceModify/>} />
            <Route path="/Customerregister" element={<Customerregister/>} />
            <Route path="/Home1" element={<Home1/>} />
            <Route path="/S2sCategoriesForm" element={<S2sCategoriesForm/>} />
            <Route path="/S2sServicesForm" element={<S2sServicesForm/>} />
            <Route path="/S2sSubcategoriesForm" element={<S2sSubcategoriesForm/>} />
            <Route path="/CartTable" element={<CartTable/>} />
            <Route path="/Transaction_Dtl" element={<Transaction_Dtl/>} />
            <Route path="/Technician_Dtl" element={<Technician_Dtl/>} />
            <Route path="/TechSkill" element={<TechSkill/>} />
            <Route path="/TechAvailability" element={<TechAvailability/>} />
            <Route path="/TechServiceList" element={<TechServiceList/>} />
            <Route path="/SupportForm" element={<SupportForm/>} />
            <Route path="/TechnicianForm" element={<TechnicianForm/>} />
            <Route path="/ServiceBookingForm" element={<ServiceBookingForm/>} />
            <Route path="/CustomerBooking" element={<CustomerBooking/>} />
            <Route path="/BookingForm" element={<BookingForm/>} />
            <Route path="/CustomerFeedbackForm" element={<CustomerFeedbackForm/>} />
            <Route path="/ServiceForm" element={<ServiceForm/>} />
            <Route path="/ServiceHistory" element={<ServiceHistory/>} />
            <Route path="/TechnicianRatings" element={<TechnicianRatings/>} />
            <Route path="/TechniciansTable" element={<TechniciansTable/>} />

            {/* Add other routes as needed */}
          </Routes>
        </SidebarWrapper>
      </Router>
    </div>
  );
}

export default App;
