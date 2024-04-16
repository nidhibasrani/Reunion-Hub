import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate , Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Sidebar from './components/Sidebar';
import ManageUsers from './Pages/ManageUsers';
import Events from './Pages/Events';
import DeleteEvent from './Pages/DeleteEvent';
import Gallery from './Pages/Gallery';
import ManageGallery from './Pages/ManageGallery';
import ContactMessages from './Pages/ContactMessages';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const Layout = () => (
    <>
      <div className="flex h-screen">
        <div className="bg-[#001524] w-1/5">
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 montserrat">Admin Dashboard</h1>
            <div className="bg-white p-6 rounded shadow">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />} 
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-events" element={<Events />} />
          <Route path="/delete-event" element={<DeleteEvent />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/manage-gallery" element={<ManageGallery />} />
          <Route path="/contact-messages" element={<ContactMessages />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
   
  );
}

export default App;
