import React, { useState } from 'react';
import CertificateCard from './CertificateCard';


const Certificate = () => {
  const [uname, setUname] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setUname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className='text-white text-4xl ml-60 p-2 mb-5'>Hey, Enter name</h3>
        <input type='text' onChange={handleChange} value={uname} className='bg-pink-300 w-72 h-10  text-3xl ml-60 mb-16'></input>
        <button type='submit' className='w-36 bg-red-400 h-9 '>Submit</button>
      </form>

      {submitted && (
        <div className="certificate">
          <CertificateCard uName={uname}/>
        </div>
      )}
    </>
  );
};

export default Certificate;
