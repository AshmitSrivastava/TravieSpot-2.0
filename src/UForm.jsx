import React from 'react';
import { useState } from 'react';
import './UForm.css'; // Make sure to create a corresponding CSS file

const Form = () => {
  const [formData, setFormData] = useState({uname:"", email:"", msg:""});

  const handleChange =(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  const handleSubmit = (e)=>{
      e.preventDefault()
      console.log(formData)
  }

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" onChange={handleChange}  />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="msg" placeholder="Type your message" onChange={handleChange} ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
