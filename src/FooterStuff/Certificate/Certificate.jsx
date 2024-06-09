import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import "./Certificate.css";

const Certificate = () => {
  const [uname, setUname] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setUname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div
        className="bg-img"
        style={{
          backgroundImage: `url(https://w0.peakpx.com/wallpaper/43/30/HD-wallpaper-travel-couple-lifestyle.jpg)`,
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <form onSubmit={handleSubmit}>
        <div className="border">
          <h3 className="header-text">Hey, Enter name</h3>
          <input
            type="text"
            onChange={handleChange}
            value={uname}
            className="input-field"
          ></input>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>

      {submitted && (
        <div className="certificate">
          <CertificateCard uName={uname} />
        </div>
      )}
    </>
  );
};

export default Certificate;
