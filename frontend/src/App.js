import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import SignIn from './pages/SignIn';
import Booking from './pages/Booking';
import UserPanel from './pages/UserPanel';
import AdminPanel from './pages/AdminPanel';
import Contact from './pages/Contact';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
