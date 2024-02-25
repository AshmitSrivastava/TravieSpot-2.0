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
    <div>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <div>
        <h3>Cultural Information</h3>
        <p>Language: {cultureInfo.language}</p>
        <p>Traditional Food: {cultureInfo.traditionalFood}</p>
        <p>Dance Form: {cultureInfo.danceForm}</p>
        <p>Currency: {cultureInfo.currency}</p>
      </div>
      <div>
        <h3>Fun Fact</h3>
        <p>{funFact}</p>
      </div>
    </div>
  );
};

export default CityDetail;
