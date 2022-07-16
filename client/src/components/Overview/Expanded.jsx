import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { StyleContext } from './Overview.jsx';
import { ViewContext } from './Overview.jsx';
// import styleData from '../data.json';

const Expanded = () => {
  const { view, setView } = useContext(ViewContext);
  const { currentStyle, currentIndex, setCurrentIndex } = useContext(StyleContext);
  const images = currentStyle.photos;

  const url = images.reduce((memo, image) => {
    memo.push(image.url)
    return memo;
  }, [])

  const thumbnailUrl = images.reduce((memo, image) => {
    memo.push(image.thumbnail_url)
    return memo;
  }, [])



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
    <div className="expandedView" >
      <div className="carousel-wrapper">
        {currentIndex > 0 &&
          <button onClick={prev} className="expanded-image-left-arrow">
            &lt;
          </button>}
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
                  onClick={() => setView('default')}
                />
              )
            })}
          </div>
        </div>

        {currentIndex < (length - 1) &&
          <button onClick={next} className="image-right-arrow" >
            &gt;
          </button>}

      </div>
      <ol className="carousel-indicators">
        { Array(length).fill(1).map((indicator, index) => {
          return <li
                  data-target="#carouselExampleIndicators"
                  className={ index === currentIndex ? "active" : ""}
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  />
        })}

      </ol>
    </div>
  )
}

export default Expanded;

const Img = styled.img`
  max-height: 700px;
  object-fit: cover;
  align-self: center;
  cursor: zoom-in;
`
