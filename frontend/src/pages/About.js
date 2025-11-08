import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div>
      <Header username={username} email={email} />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>About Buskarro</h2>
        <p>Buskarro is a modern bus reservation system designed to make your travel planning easy and convenient.</p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
