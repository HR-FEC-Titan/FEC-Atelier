import React, { useEffect, useState, useContext, createContext } from 'react';
import styled from 'styled-components';
import { StyleContext } from './Overview.jsx';


const DefaultImage = () => {

  const { styles, styleIndex, currentIndex, setCurrentIndex, changeView } = useContext(StyleContext);

  const currentStyle = styles[styleIndex];
  const images = currentStyle.photos;
  const url = images.reduce((memo, image) => {
    if (image.url) {
      memo.push(image.url)
    }
    return memo;
  }, [])
  const thumbnailUrl = images.reduce((memo, image) => {
    if (image.thumbnail_url) {
      memo.push(image.thumbnail_url)
    }
    return memo;
  }, [])


  // use Length to track left and right arrow
  const [length, setLength] = useState(url.length);

  // main carousel left and right arrow function
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

  // vertical carousel up and down arrow function ENABLE by changing the 'veriticalDisplay' value
  const verticalDisplay = 6;
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(verticalDisplay - 1);

  const up = () => {
    if (topIndex > 0) {
      setTopIndex(prevState => prevState - 1);
      setBottomIndex(prevState => prevState - 1);
    }
  }

  const down = () => {
    if (bottomIndex < thumbnailUrl.length - 1) {
      setTopIndex(prevState => prevState + 1);
      setBottomIndex(prevState => prevState + 1);
    }
  }

  useEffect(() => {
    if (currentIndex < topIndex) {
      setTopIndex(currentIndex);
      setBottomIndex(currentIndex + verticalDisplay - 1)
    } else if (currentIndex > bottomIndex) {
      setTopIndex(currentIndex - verticalDisplay + 1);
      setBottomIndex(currentIndex);
    }
  }, [currentIndex])

  useEffect(() => {
    if (currentIndex > bottomIndex) {
      setCurrentIndex(bottomIndex);
    }
    if (currentIndex < topIndex) {
      setCurrentIndex(topIndex);
    }
  }, [topIndex, bottomIndex])

  return (
    <div className="imageGallery" >
      {/* ==========================main Carousel images ==================*/}
      <div className="carousel-wrapper">

        {/* ================  main prev buttons =================*/}
        {currentIndex > 0 &&
          <a class="carousel-control-prev defaultImage-left-arrow" onClick={prev}>
            <span class="carousel-control-prev-icon"></span>
          </a>
        }

        {/* ==========================main images ==================*/}
        <div className={"carousel-content-wrapper"}>
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

        {/* ================  main next buttons =================*/}
        {currentIndex < (length - 1) &&
          <a class="carousel-control-next" onClick={next} >
            <span class="carousel-control-next-icon"></span>
          </a>
        }


        {/* ==========================thumbnail carousel ==================*/}
        <div className="t-carousel-container">
          <div className="t-carousel-wrapper">
            {/* ================  thumbnail prev buttons =================*/}
            {topIndex > 0 &&
              // <button onClick={up} className="t-image-up-arrow">
              //   &#8963;
              // </button>
              <i className="bi bi-chevron-compact-up t-image-up-arrow" onClick={up}></i>
            }

            {/* ================  thumbnail images =================*/}
            <div className="t-carousel-content-wrapper">
              <div
                className={`t-carousel-content`}
                style={{
                  transform: `t-translateY(-${currentIndex * (100 / 1)}%)`
                }}
              >

                {thumbnailUrl.map((thumbnail, idx) => {
                  if (idx <= bottomIndex && idx >= topIndex) {
                    return (
                      <StyledImage
                        // max-height={`${100/thumbnailUrl.length}%`}
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
                  }
                })}

              </div>
            </div>

            {/* ================  thumbnail next buttons =================*/}
            {bottomIndex < (length - 1) &&
              // <button onClick={down} className="t-image-down-arrow">
              //   &#8964;
              // </button>
              <i className="bi bi-chevron-compact-down t-image-down-arrow"
                // style={{"font-size": "34px", "color": "white", opacity:"0.5"}}
               onClick={down}></i>
              }
          </div>
        </div>

      </div>

    </div>
  )
}

export default DefaultImage;

const Img = styled.img`
  height: 97%;
  object-fit: cover;
  align-self: center;
  cursor: zoom-in;
`


const StyledImage = styled.img`
 z-index: 50;
 max-height: 14%;
 padding: 3px;
 object-fit: cover;
 cursor: pointer;
 border: ${({ id, currentIndex }) => id === currentIndex ? 'solid gold 5px' : ''};
`