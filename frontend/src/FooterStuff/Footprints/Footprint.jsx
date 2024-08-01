import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Footprint() {
  const [dist, setDist] = useState(0); // useState inside the component

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromFlight',
      params: {
        distance: dist,
        type: 'DomesticFlight'
      },
      headers: {
        'x-rapidapi-key': '47b6ef6d4dmsh52365304ae1b633p171b3cjsn13e9575cd280',
        'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dist]); // Dependency array with dist means this effect runs whenever dist changes

  const handleDistChange = (event) => {
    const distVal = event.target.value; // Get the value from the input
    setDist(distVal); // Update the state using the setter function
    console.log(distVal);
  };

  return (
    <div>
      <input
        type='text'
        onChange={handleDistChange}
        value={dist}
        placeholder="Enter distance"
      />
      <button onClick={fetchData}>Check</button>
    </div>
  );
}

export default Footprint;
