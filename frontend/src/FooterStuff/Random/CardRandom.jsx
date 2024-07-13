import React from 'react';


const CardRandom = ({ title, category, address, country, description }) => {
  return (
    <div className="bg-gray-800 text-white mx-auto my-4 p-6 rounded-lg shadow-lg w-3/4">
      <div>
        <p className="text-2xl font-semibold mb-2">{title}</p>
        <p className="text-gray-400 mb-2"><span className='text-xl text-blue-400 font-semibold'>Address:</span> {address}</p>
        <p className="text-gray-400 mb-2"><span className='text-xl text-blue-400 font-semibold'>Description: </span>{description}</p>
        <p className="text-gray-400 mb-2"><span className='text-xl text-blue-400 font-semibold'>Category: </span>{category}</p>
        <p className="text-gray-400 mb-2"><span className='text-xl text-blue-400 font-semibold'>Country: </span>{country}</p>
      </div>
    </div>
  );
};

export default CardRandom;
