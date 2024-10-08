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
import Images from './Images/Images';
import Cd from './Components/Customers/Cd';
import Od from './Offers/Od';
import Events from './Images/Events';
import ServiceModify from './Services/ServiceModify';
import Customerregister from './Components/Customers/Customerregister';


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
            <Route path="/Images" element={<Images/>} />
            <Route path="/Cd" element={<Cd/>} />
            <Route path="/Od" element={<Od/>} />
            <Route path="/Events" element={<Events/>} />
            <Route path="/ServiceModify" element={<ServiceModify/>} />
            <Route path="/Customerregister" element={<Customerregister/>} />

            {/* Add other routes as needed */}
          </Routes>
        </SidebarWrapper>
      </Router>
    </div>
  );
}

export default App;
