import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const Carousel = (props) => {
  const { url, thumbnailUrl, show, infiniteLoop } = props;
  console.log(url);

  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(url.length)

  useEffect(() => {
    setLength(url.length)
  }, [url])

  const next = () => {
    if (currentIndex < (length - show)) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  return (
    <React.Fragment>
      <div className="carousel-container" >
        <div className="carousel-wrapper">
          {currentIndex > 0 &&
            <button onClick={prev} className="image-left-arrow">
              &lt;
            </button>}
          <div className="carousel-content-wrapper">

            <div
              className="carousel-content"
              style={{
                transform: `translateX(-${currentIndex * (100 / show)}%)`
              }}>

              {url.map((u, idx) => {
                return (
                  <Img
                    src={u}
                    alt="placeholder"
                    key={idx}
                    style={{ padding: "8px" }}
                    className="image"
                  />
                )
              })}
            </div>
          </div>

          {currentIndex < (length - show) &&
            <button onClick={next} className="image-right-arrow">
              &gt;
            </button>}

        </div>
      </div>



      {/* ==========================thumbnail images ==================*/}
      <div className="thumbnailCarousel">
        <div className="t-carousel-container">
          <div className="t-carousel-wrapper">
            {/* ================  hide buttons for now =================*/}
            {/* {currentIndex > 0 &&
            <button onClick={prev} className="t-image-up-arrow">
              &#8963;
            </button>} */}


            <div className="t-carousel-content-wrapper">
              <div
                className={`t-carousel-content show-${show}`}
                style={{
                  transform: `t-translateY(-${currentIndex * (100 / show)}%)`
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
    </React.Fragment>
  )
}

export default Carousel;

const Img = styled.img`
  /* width: 100%; */
  max-height: 500px;
  object-fit: cover;
  align-self: center;
  margin-top: 10px;
  cursor: zoom-in;
`


const StyledImage = styled.img`

 width: 100%;
 max-height: 16%;
 padding: 8px;
 object-fit: cover;
 cursor: pointer;
 border: ${({ id, currentIndex }) => id === currentIndex ? 'solid red 5px' : ''};
`