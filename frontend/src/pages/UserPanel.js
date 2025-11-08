import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserPanel() {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div>
      <Header username={username} email={email} />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>User Panel</h2>
        <p>Welcome to your dashboard, {username}!</p>
      </div>
      <Footer />
    </div>
  );
}

export default UserPanel;
