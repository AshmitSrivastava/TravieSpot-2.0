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
    <>
      <div className="outer-div h-screen w-[100%] flex">
        <div className='city-img'>
          <img src={image} alt={title} />
        </div>

      
          <div className="info">
            <img src={image} />
            <h2>{title}</h2>
            <h3>Cultural Information</h3>
            <p><span>Language: </span>{cultureInfo.language}</p>
            <p><span>Traditional Food: </span>{cultureInfo.traditionalFood}</p>
            <p><span>Dance Form: </span>{cultureInfo.danceForm}</p>
            <p><span>Currency: </span>{cultureInfo.currency}</p>
            <div className='ff'>
              <h3>Fun Fact</h3>
              <p>{funFact}</p>
            </div>
          </div>
       
      </div>
    </>

  );
};

export default CityDetail;
