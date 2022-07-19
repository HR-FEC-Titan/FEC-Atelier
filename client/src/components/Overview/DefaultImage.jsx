import React, { useEffect, useState, useContext, createContext } from 'react';
import styled from 'styled-components';
import { StyleContext } from './Overview.jsx';


const DefaultImage = () => {

  const { currentIndex, setCurrentIndex, currentStyle, changeView } = useContext(StyleContext);

  const images = currentStyle.photos;
  const url = images.reduce((memo, image) => {
    memo.push(image.url)
    return memo;
  }, [])
  const thumbnailUrl = images.reduce((memo, image) => {
    memo.push(image.thumbnail_url)
    return memo;
  }, [])


  // use Length to track left and right arrow
  const [length, setLength] = useState(url.length)

  useEffect(() => {
    setLength(url.length)
  }, [url])

  const next = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  return (
    <div className="imageGallery" >
      {/* ==========================main Carousel images ==================*/}
        <div className="carousel-wrapper">
          {currentIndex > 0 &&
            <button onClick={prev} className="image-left-arrow">
              &lt;
            </button>}
          <div className={ "carousel-content-wrapper"}>

            <div
              className={"carousel-content"}
              style={{
                transform: `translateX(-${currentIndex * (100 / 1)}%)`
              }}>

              {url.map((u, idx) => {
                return (
                  <Img
                    src={u}
                    alt="placeholder"
                    key={idx}
                    onClick={() => changeView('expanded')}
                  />
                )
              })}
            </div>
          </div>

          {currentIndex < (length - 1) &&
            <button onClick={next} className="image-right-arrow">
              &gt;
            </button>}

        </div>



      {/* ==========================thumbnail images ==================*/}
        <div className="t-carousel-container">
          <div className="t-carousel-wrapper">
            {/* ================  hide buttons for now =================*/}
            {/* {currentIndex > 0 &&
            <button onClick={prev} className="t-image-up-arrow">
              &#8963;
            </button>} */}


            <div className="t-carousel-content-wrapper">
              <div
                className={`t-carousel-content show-${1}`}
                style={{
                  transform: `t-translateY(-${currentIndex * (100 / 1)}%)`
                }}
              >

                {thumbnailUrl.map((thumbnail, idx) => {
                  return (
                    <StyledImage
                      src={thumbnail}
                      alt="placeholder"
                      key={idx}
                      id={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                      }}
                      currentIndex={currentIndex}
                    />
                  )
                })}

              </div>
            </div>

            {/* ================  hide buttons for now =================*/}
            {/* {currentIndex < (length - show) &&
            <button onClick={next} className="t-image-down-arrow">
              &#8964;
            </button>} */}
          </div>
      </div>
    </div>
  )
}

export default DefaultImage;

const Img = styled.img`
  /* width: 100%; */
  height: 100%;
  object-fit: cover;
  align-self: center;
  cursor: zoom-in;
`


const StyledImage = styled.img`
 max-height: 16%;
 padding: 3px;
 object-fit: cover;
 cursor: pointer;
 border: ${({ id, currentIndex }) => id === currentIndex ? 'solid gold 5px' : ''};
`