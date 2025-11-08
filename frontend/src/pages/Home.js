import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [whenDate, setWhenDate] = useState('');
  const [fromResults, setFromResults] = useState([]);
  const [toResults, setToResults] = useState([]);
  const [showFromResults, setShowFromResults] = useState(false);
  const [showToResults, setShowToResults] = useState(false);
  const navigate = useNavigate();

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna'
  ];

  const handleFromSearch = (value) => {
    setFromLocation(value);
    if (value.length > 0) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFromResults(filtered);
      setShowFromResults(true);
    } else {
      setShowFromResults(false);
    }
  };

  const handleToSearch = (value) => {
    setToLocation(value);
    if (value.length > 0) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setToResults(filtered);
      setShowToResults(true);
    } else {
      setShowToResults(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromLocation && toLocation && whenDate) {
      navigate('/booking', {
        state: { from: fromLocation, to: toLocation, date: whenDate }
      });
    } else {
      alert('Please fill all fields');
    }
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div className="home-page">
      <Header username={username} email={email} />
      
      <div className="hero_title">
        <p className="title_text">
          Travel Smarter, Book Faster.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="hero">
          <div className="search_box_container">
            <div className="f11">
              <div className="from_container">
                <p className="search_text">From</p>
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => handleFromSearch(e.target.value)}
                  placeholder="From"
                  className="search_box"
                />
                {showFromResults && fromResults.length > 0 && (
                  <div className="results" id="results-from">
                    {fromResults.map((city, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setFromLocation(city);
                          setShowFromResults(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="interchange">
                <button
                  type="button"
                  className="inter-btn"
                  onClick={swapLocations}
                >
                  ⇄
                </button>
              </div>

              <div className="to_container">
                <p className="search_text">To</p>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => handleToSearch(e.target.value)}
                  placeholder="To"
                  className="search_box"
                />
                {showToResults && toResults.length > 0 && (
                  <div className="results" id="results-to">
                    {toResults.map((city, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setToLocation(city);
                          setShowToResults(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="when_container">
                <p className="search_text">When</p>
                <input
                  type="date"
                  value={whenDate}
                  onChange={(e) => setWhenDate(e.target.value)}
                  min={getTodayDate()}
                  className="search_box"
                />
              </div>
            </div>
            <div className="search_buses">
              <button type="submit" className="search_box_btn">
                <i className="fas fa-search"></i> Search Buses
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="sub_hero">
        <div className="sub_hero_title">
          <p className="sbh_text">Features we provide</p>
        </div>
        <div className="feature_con">
          <div className="fea rev1">
            <p className="f_text">
              <span className="f_title">Real-time Seat Availability</span>
              <br /><br />
              Allows passengers to see available seats in real-time.
            </p>
          </div>
          <div className="fea rev2">
            <p className="f_text">
              <span className="f_title">Online Payment Integration</span>
              <br /><br />
              Supports various payment methods like credit/debit cards, net banking, and digital wallets.
            </p>
          </div>
          <div className="fea rev3">
            <p className="f_text">
              <span className="f_title">Multi-modal Interconnectivity</span>
              <br /><br />
              Connects with other transport services for seamless travel planning.
            </p>
          </div>
          <div className="fea rev4">
            <p className="f_text">
              <span className="f_title">Self-Service Capability</span>
              <br /><br />
              Enables passengers to book, modify, and cancel tickets on their own.
            </p>
          </div>
          <div className="fea rev5">
            <p className="f_text">
              <span className="f_title">Advanced Fare Management</span>
              <br /><br />
              Offers dynamic pricing based on demand, time of booking, and other factors.
            </p>
          </div>
          <div className="fea rev6">
            <p className="f_text">
              <span className="f_title">Comprehensive Reporting</span>
              <br /><br />
              Provides detailed reports and analytics for bus operators to improve services.
            </p>
          </div>
          <div className="fea rev7">
            <p className="f_text">
              <span className="f_title">Customer Support</span>
              <br /><br />
              Includes features like chatbots, email support, and helplines for passenger assistance.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
