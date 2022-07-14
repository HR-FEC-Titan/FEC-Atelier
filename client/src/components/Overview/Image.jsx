import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';

import { CurrentStyleContext } from './Style.jsx';
import Carousel from "./Carousel/Carousel.js";


const Image = () => {

  const currentStyle = useContext(CurrentStyleContext);
  const images = currentStyle.photos;

  // const [imageIndex, setImageIndex] = useState(0);
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [length, setLength] = useState(images.length);

  return (
    <div className="imageGallery image" >
      <Carousel show={1} infiniteLoop={true} >

        {images.map((i, idx) => {
          return (
            <img
              src={i.url}
              alt="placeholder"
              key={idx}
              style={{padding: "8px"}}
              className="image"
            />
          )
        })}

      </Carousel>
    </div>
  )
}

export default Image;
