import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ username, email }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session/tokens
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/signin');
  };

  return (
    <div className="nav_bar">
      <div className="comp_name">
        <button className="company_name" onClick={() => navigate('/')}>
          Bus Karro
        </button>
      </div>
      <div className="nav_buttons">
        <Link to="/contact" className="search_button Links">
          Contact
        </Link>
        {username ? (
          <div className="dropdown">
            <p 
              className="search_button dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {username}
            </p>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-item">{email}</p>
                <p className="dropdown-item">{username}</p>
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signin" className="search_button Links">
              Sign In
            </Link>
            <Link to="/register" className="search_button Links">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
