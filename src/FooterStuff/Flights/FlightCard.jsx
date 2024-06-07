import React from "react";
import "./FlightCard.css";

const FlightCard = ({
  from,
  fromap,
  fromcou,
  to,
  toap,
  tocou,
  dur,
  fcode,
  fname,
  stops,
  tzone,
}) => {
  return (
    <>
      <div className="bg-img">
        <div className="flight-card">
          <h2>From: {from}</h2>
          <h2>FromApname: {fromap}</h2>
          <h2>FromCountry: {fromcou}</h2>
          <h2>To:{to} </h2>
          <h2>ToApname:{toap} </h2>
          <h2>ToCountry:{tocou} </h2>
          <h2>Duration:{dur} </h2>
          <h2>FlighCode:{fcode} </h2>
          <h2>FlightName:{fname} </h2>
          <h2>Stops:{stops} </h2>
          <h2>TimeZone:{tzone} </h2>
        </div>
      </div>
    </>
  );
};

export default FlightCard;
