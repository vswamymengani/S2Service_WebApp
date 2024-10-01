import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'; // Import the Login component
import Home from './Components/Home'; // Import the Home component
import Sidebar from './Components/Sidebar'; // Import the Sidebar component

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
            {/* Add other routes as needed */}
          </Routes>
        </SidebarWrapper>
      </Router>
    </div>
  );
}

export default App;
