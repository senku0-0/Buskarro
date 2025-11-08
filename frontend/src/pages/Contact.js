import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div>
      <Header username={username} email={email} />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Contact Us</h2>
        <p>Get in touch with us for any queries or support.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
