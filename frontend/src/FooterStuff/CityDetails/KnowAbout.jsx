// Import your dataset
import KnowAboutDataset from './KnowAboutDataset';

import React from 'react';
import { Link } from 'react-router-dom';

const KnowAbout = () => {
    const data = KnowAboutDataset[0];

    return (
        <div>
            <h2>Know About</h2>
                <ul className='grid grid-cols-3'>
                    {data.map((city) => (
                        <li key={city.id}>
                            <Link to={`/know/${city.id}`}>
                                <div className="div w-4/6 h-5/6 p-2">
                                <img src={city.image} alt={city.title} className='rounded-3xl w-[100%] h-[100%] object-cover' />
                                </div>
                                <p style={{color:"white"}}>{city.title}</p>
                            </Link>
                        </li>
                    ))}
               </ul>
            </div>
        
    );
};

export default KnowAbout;
