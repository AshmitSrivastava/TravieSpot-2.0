import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'

const Login = ({ onLogin }) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formValues);
      alert(response.data.message);
      onLogin(response.data.token);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
    <div className="login-outercontainer">
    <div className="login-innercontainer">
      <div className="login-title">Login</div>
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="Email" required className="login-input-boxes" />
      <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" required className="login-input-boxes" />
      <button type="submit" id='login_btn_ash'>Login</button>
    </form>
    </div>
    </div>
    </>
  );
};

export default Login;
