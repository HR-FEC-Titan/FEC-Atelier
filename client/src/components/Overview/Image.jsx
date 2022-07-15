import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';

import { CurrentStyleContext } from './Style.jsx';
import Carousel from "./Carousel/Carousel.jsx";



const Image = () => {

  const currentStyle = useContext(CurrentStyleContext);
  const images = currentStyle.photos;
  const url = images.reduce((memo, image) => {
    memo.push(image.url)
    return memo;
  }, [])
  const thumbnailUrl = images.reduce((memo, image) => {
    memo.push(image.thumbnail_url)
    return memo;
  }, [])

  return (
    <div className="imageGallery" >
      <Carousel show={1} url={url} thumbnailUrl={thumbnailUrl} />
    </div>
  )
}

export default Image;



