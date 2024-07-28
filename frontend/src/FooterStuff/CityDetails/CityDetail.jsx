import React from 'react';
import { useParams } from 'react-router-dom';
import KnowAboutDataset from './KnowAboutDataset';
import './CityDetail.css'

const CityDetail = () => {
  // Extract the id parameter from the URL
  const { id } = useParams();

  // Retrieve the city data from the dataset based on the id
  const city = KnowAboutDataset[0].find((city) => city.id.toString() === id);

  // Check if the city object is available
  if (!city) {
    return <p>City not found</p>;
  }

  // Destructure the city object for easy access to its properties
  const { title, image, cultureInfo, funFact } = city;

  return (
    
    <div className="city-detail-container">
      <div className="city-img-container">
        <img src={image} alt={title} className="city-img" />
      </div>
      <div className="city-info-container">
        <h2 id='citydetail-title'>{title}</h2>
        <div className="city-culture-info">
          <p><span>Language:</span> {cultureInfo.language}</p>
          <p><span>Traditional Food:</span> {cultureInfo.traditionalFood}</p>
          <p><span>Dance Form:</span> {cultureInfo.danceForm}</p>
          <p><span>Currency:</span> {cultureInfo.currency}</p>
        </div>
        <div className="city-fun-fact">
          <h3>Fun Fact</h3>
          <p>{funFact}</p>
        </div>
      </div>
    </div>
  );
};

export default CityDetail;
