import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const getImageUrl = (images) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    console.log(images);
    return `${BASE_URL}:5000/api/getImage/${images}`;
};
const ImageSlider = (images) => {
  return (
    <Carousel>
      {/* {images.map((image, index) => ( */}
        <div >
          <img src={getImageUrl(images.images)}  />
        </div>
      {/* ))} */}
    </Carousel>
  );
};

export default ImageSlider;