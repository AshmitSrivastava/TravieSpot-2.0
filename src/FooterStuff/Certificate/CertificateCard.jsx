import React from "react";
import "./CertificateCard.css";
import "./CertificateImage.png";
import { saveAsPng } from "save-html-as-image";
const node = document.getElementById("elementId");

const CertificateCard = ({ uName }) => {
  const handleDownload = () => {
    const node = document.getElementById("certificateCard");
    saveAsPng(node);

    saveAsPng(node, { filename: "Report", printDate: true });
  };
  return (
    <>
      <div id="certificateCard" className="certiImage">
        <img src={CertificateImage}></img>
        <h2 className="font-PlayfairDisplay">{uName}</h2>
      </div>

      <button id="btn" onClick={handleDownload}>
        Download
      </button>
    </>
  );
};

export default CertificateCard;
