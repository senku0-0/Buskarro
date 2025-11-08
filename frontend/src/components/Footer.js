import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer_company_name">
        <h1 className="footer_company_name_text">Bus Karro</h1>
      </div>
      <div className="footer_details">
        <div className="footer_info1">
          <p className="footer_company_topic">
            <strong>About</strong>
          </p>
          <Link to="/about" className="footer-link">
            <p className="links">About us</p>
          </Link>
          <Link to="/terms" className="footer-link">
            <p className="links">Terms and Conditions</p>
          </Link>
          <Link to="/privacy" className="footer-link">
            <p className="links">Privacy Policy</p>
          </Link>
          <Link to="/" className="footer-link">
            <p className="links">Home</p>
          </Link>
        </div>
        <div className="footer_info2">
          <p className="footer_topic">
            <strong>Info</strong>
          </p>
          <Link to="/blog" className="footer-link">
            <p className="links">Blog</p>
          </Link>
          <Link to="/user-agreement" className="footer-link">
            <p className="links">User Agreement</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
