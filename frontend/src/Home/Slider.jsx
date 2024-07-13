import React from "react";
import Sec2_img1 from "./img/Sec2_img1.jpg";
import Sec2_img2 from "./img/Sec2_img2.jpg";
import Sec2_img3 from "./img/Sec2_img3.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const imageStyle = {
    borderRadius: "10px",
    height: "auto",
    width: "370px",
    marginBottom: "60px",
    float: "left",
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1000}
        infinite={true}
      >
        <div>
          <img src={Sec2_img1} style={imageStyle} alt="Image 1" />
        </div>
        <div>
          <img src={Sec2_img2} style={imageStyle} alt="Image 2" />
        </div>
        <div>
          <img src={Sec2_img3} style={imageStyle} alt="Image 3" />
        </div>
        <div>
          <img src={Sec2_img1} style={imageStyle} alt="Image 1" />
        </div>
        <div>
          <img src={Sec2_img2} style={imageStyle} alt="Image 2" />
        </div>
        <div>
          <img src={Sec2_img3} style={imageStyle} alt="Image 3" />
        </div>
      </Carousel>
    </>
  );
};

export default Slider;
