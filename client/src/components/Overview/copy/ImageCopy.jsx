import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import styled from 'styled-components';

import { CurrentStyleContext } from './Style.jsx';
import Carousel from "./Carousel/Carousel.jsx";
import ThumbnailCarousel from './Carousel/ThumbnailCarousel.jsx';



const Image = () => {

  const currentStyle = useContext(CurrentStyleContext);
  console.log(currentStyle);
  const images = currentStyle.photos;

  // const [imageIndex, setImageIndex] = useState(0);
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [length, setLength] = useState(images.length);

  const expandImage = (e) => {
    e.target.style.transform = "scale(1.5)"
  }

  return (
    <div className="imageGallery" >

      <div className="image" >
        <Carousel show={1} infiniteLoop={true} >
          {images.map((i, idx) => {
            return (
              <img
                src={i.url}
                alt="placeholder"
                key={idx}
                style={{ padding: "8px" }}
                className="image"
              />
            )
          })}
        </Carousel>
      </div>



      <div className="thumbnailCarousel">
          <ThumbnailCarousel show={4} >
          {images.map((i, idx) => {
            return (
              <StyledImage
                src={i.thumbnail_url}
                alt="placeholder"
                key={idx}
                style={{ padding: "8px" }}

                className="thumbnailImage"
              />
            )
          })}
          </ThumbnailCarousel>
      </div>
    </div>
  )
}

export default Image;


const StyledImage = styled.img`
 width: 100%;
 max-height: 16%;
 object-fit: cover;
 cursor: pointer;
`
