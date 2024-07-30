import React from 'react';
import axios from 'axios';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/logout');
      alert(response.data.message);
      onLogout();
    } catch (error) {
      console.error('Error in handleLogout:', error);
      //alert(error.response.data.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
