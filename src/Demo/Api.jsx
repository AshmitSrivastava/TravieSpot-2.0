import React, { useState } from 'react';
import axios from 'axios';
import Card from '../Card';

const Api = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
      params: { term: query },
      headers: {
        'X-RapidAPI-Key': '47b6ef6d4dmsh52365304ae1b633p171b3cjsn13e9575cd280',
        'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data.list || []); // Update searchResults with the actual data or an empty array if no data
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input type='text' value={query} onChange={handleOnChange} />
        <button className='bg-red-200'>Search</button>
      </form>

      <div className="container flex flex-col items-center bg-slate-800">
       <h2 className='text-7xl text-white'>{query}</h2>
      {searchResults.map((result, index) => (
        <Card
        key={index}
        definition={result.definition} 
        author={result.author}
        example={result.example}
          // Add other props as needed
        />
      ))}
      </div>
    </>
  );
};

export default Api;
