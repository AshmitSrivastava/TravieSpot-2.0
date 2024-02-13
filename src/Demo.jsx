import React, { useState, useEffect, useRef } from 'react';



const Demo = () => {
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [poiContent, setPoiContent] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY;

  const pageLength = 5; // number of objects per page

  const apiGet = (method, query) => {
    return new Promise((resolve, reject) => {
      let otmAPI = `https://api.opentripmap.com/0.1/en/places/${method}?apikey=${apiKey}`;
      if (query !== undefined) {
        otmAPI += `&${query}`;
      }

      fetch(otmAPI)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => {
          console.log("Fetch Error :-S", err);
          reject(err);
        });
    });
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    let name = textboxRef.current.value;
    apiGet("geoname", `name=${name}`).then(data => {
      let message = "Name not found";
      if (data.status === "OK") {
        message = `${data.name}, ${getCountryName(data.country)}`;
        setLon(data.lon);
        setLat(data.lat);
        firstLoad();
      }
      setInfoMessage(message);
    });
  };

  const firstLoad = () => {
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
    ).then(data => {
      setCount(data.count);
      setOffset(0);
      setInfoMessage(`${count} objects with description in a 1km radius`);
      loadList();
    });
  };

  const loadList = () => {
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
    ).then(data => {
      setListItems(data);
      let nextBtnVisibility = count < offset + pageLength ? "hidden" : "visible";
      setNextBtnVisibility(nextBtnVisibility);
      setNextBtnText(`Next (${offset + pageLength} of ${count})`);
    });
  };

  const createListItem = item => {
    return (
      <a
        key={item.xid}
        className="list-group-item list-group-item-action"
        data-id={item.xid}
        onClick={() => handleListItemClick(item.xid)}
      >
        <h5 className="list-group-item-heading">{item.name}</h5>
        <p className="list-group-item-text">{getCategoryName(item.kinds)}</p>
      </a>
    );
  };

  const handleListItemClick = xid => {
    setListItems(prevListItems =>
      prevListItems.map(item => ({
        ...item,
        active: item.xid === xid
      }))
    );
    apiGet("xid/" + xid).then(data => onShowPOI(data));
  };

  const onShowPOI = data => {
    let content = '';
    if (data.preview) {
      content += `<img src="${data.preview.source}" alt="preview">`;
    }
    content += data.wikipedia_extracts
      ? data.wikipedia_extracts.html
      : data.info
        ? data.info.descr
        : "No description";
    content += `<p><a target="_blank" rel="noopener noreferrer" href="${data.otm}">Show more at OpenTripMap</a></p>`;
    setPoiContent(content);
  };

  const handleNextButtonClick = () => {
    setOffset(prevOffset => prevOffset + pageLength);
    loadList();
  };

  // Your getCountryName function goes here

  // State and refs
  const [infoMessage, setInfoMessage] = useState('');
  const [nextBtnVisibility, setNextBtnVisibility] = useState('hidden');
  const [nextBtnText, setNextBtnText] = useState('Next');

  // Refs
  const textboxRef = useRef(null);

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="textbox">City Name:</label>
        <input type="text" id="textbox" ref={textboxRef} />
        <button type="submit">Search</button>
      </form>

      <div id="info">{infoMessage}</div>

      <div>
        <div id="list" className="list-group">
          {listItems.map(item => createListItem(item))}
        </div>
        <button
          id="next_button"
          style={{ visibility: nextBtnVisibility }}
          onClick={handleNextButtonClick}
        >
          {nextBtnText}
        </button>
      </div>

      <div id="poi" dangerouslySetInnerHTML={{ __html: poiContent }}></div>
    </div>
  );
};

export default Demo;
