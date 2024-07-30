import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formValues.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" required />
      <input type="password" name="reconfirm_password" value={formValues.reconfirm_password} onChange={handleChange} placeholder="Reconfirm Password" required />
      <input type="text" name="gender" value={formValues.gender} onChange={handleChange} placeholder="Gender" required />
      <input type="text" name="country" value={formValues.country} onChange={handleChange} placeholder="Country" required />
      <input type="text" name="state" value={formValues.state} onChange={handleChange} placeholder="State" required />
      <input type="text" name="phone" value={formValues.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
