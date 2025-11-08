import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminPanel() {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div>
      <Header username={username} email={email} />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Admin Panel</h2>
        <p>Welcome to the admin dashboard, {username}!</p>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPanel;
