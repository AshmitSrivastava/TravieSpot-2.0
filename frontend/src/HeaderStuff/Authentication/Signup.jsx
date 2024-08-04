import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";
const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    reconfirm_password: '',
    gender: '',
    country: '',
    state: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', formValues);
      alert(response.data.message);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="signup-outer-container">
        <div className="signup-inner-container">
          <form onSubmit={handleSubmit} className="signup-form">
            <div id='signup-p-title'>Sign Up</div>
            <hr id='sign-up-hr' />
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="signup-input-boxes"
            />
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="signup-input-boxes"
            />
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="signup-input-boxes"
            />
            <input
              type="password"
              name="reconfirm_password"
              value={formValues.reconfirm_password}
              onChange={handleChange}
              placeholder="Reconfirm Password"
              required
              className="signup-input-boxes"
            />
            <input
              type="text"
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
              placeholder="Gender"
              required
              className="signup-input-boxes"
            />
            <input
              type="text"
              name="country"
              value={formValues.country}
              onChange={handleChange}
              placeholder="Country"
              required
              className="signup-input-boxes"
            />
            <input
              type="text"
              name="state"
              value={formValues.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="signup-input-boxes"
            />
            <input
              type="text"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
              className="signup-input-boxes"
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
