import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { CurrentStyleContext } from './Style.jsx';


const Image = () => {

  const currentStyle = useContext(CurrentStyleContext);

  const images = currentStyle.photos;
  const [imageIndex, setImageIndex] = useState(0);

  // useEffect(() => {
  //   setImages(currentStyle.photos);
  // }, currentStyle);


  return <div className="imageGallery">

    <img className="image"
      src={images[imageIndex].url}
       onClick={() => {
                if (imageIndex === images.length - 1) {
                  setImageIndex(0);
                } else {
                  setImageIndex(imageIndex + 1);
                }
              }}
    />

  </div>
}

export default Image;