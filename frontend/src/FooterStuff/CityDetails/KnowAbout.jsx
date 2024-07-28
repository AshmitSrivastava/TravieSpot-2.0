import React from 'react';
import { Link } from 'react-router-dom';
import KnowAboutDataset from './KnowAboutDataset';
import './KnowAbout.css';

const KnowAbout = () => {
    const data = KnowAboutDataset[0];

    return (
        <div className="know-about-container">
            <h2 className="know-about-title">Know About</h2>
            <ul className="know-about-grid">
                {data.map((city) => (
                    <li key={city.id} className="know-about-item">
                        <Link to={`/know/${city.id}`}>
                            <div className="know-about-image-container">
                                <img src={city.image} alt={city.title} className="know-about-image" />
                            </div>
                            <p className="know-about-text">{city.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KnowAbout;
