import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Booking.css';

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};

  if (!from || !to || !date) {
    navigate('/');
    return null;
  }

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div className="booking-page">
      <Header username={username} email={email} />
      <div className="booking-container">
        <h2>Available Buses</h2>
        <div className="search-info">
          <p><strong>From:</strong> {from}</p>
          <p><strong>To:</strong> {to}</p>
          <p><strong>Date:</strong> {date}</p>
        </div>
        <div className="bus-list">
          <p>Loading available buses...</p>
          {/* Bus results will be displayed here */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Booking;
