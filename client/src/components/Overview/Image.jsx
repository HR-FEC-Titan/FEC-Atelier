import React from 'react';
import { StyleIndexContext, StylesContext } from './Style.jsx';
import { useState, useEffect, useContext, createContext } from 'react';



const Image = () => {

  const styleIndex = useContext(StyleIndexContext);
  const styles = useContext(StylesContext);

  const [images, setImages] = useState(styles[styleIndex].photos);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImages(styles[styleIndex].photos);
  }, [styleIndex])


  return <div className="imageGallery">

    <img
      src={images[imageIndex].url}
      width="95%"
      height="auto"
       onClick={() => {
                if (imageIndex === images.length - 1) {
                  setImageIndex(0);
                } else {
                  setImageIndex(imageIndex + 1);
                }
              }}
    />

    {/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

      <div class="carousel-inner">
        <div className="carousel-item active" >
          <img
            // class="d-block w-100"
            src={images[imageIndex].url}
            width="90%"
            height="auto"
            alt="" />
        </div>

        {images.slice(1).map((i, idx) =>
          <div className="carousel-item" >
            <img
              // class="d-block w-100"
              src={images[imageIndex].url}
              width="90%"
              height="auto"
              // onClick={() => {
              //   if (imageIndex === images.length - 1) {
              //     setImageIndex(0);
              //   } else {
              //     setImageIndex(imageIndex + 1);
              //   }
              // }}
              alt="" />
          </div>
        )}

      </div>

      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div> */}




  </div>
}

export default Image;