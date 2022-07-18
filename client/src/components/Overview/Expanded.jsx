import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import ExpandedAndMore from './ExpandedAndMore.jsx';
import { StyleContext } from './Overview.jsx';

const Expanded = () => {
  // const { view, setView } = useContext(ViewContext);
  const { currentStyle, currentIndex, setCurrentIndex, changeView } = useContext(StyleContext);
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
    <>
      <div className="carousel-wrapper">
        {currentIndex > 0 &&
          <a class="carousel-control-prev" onClick={prev}>
            <span class="carousel-control-prev-icon" ></span>
          </a>}

        <div className={"carousel-content-wrapper"}>
          <div
            className={"carousel-content"}
            style={{
              transform: `translateX(-${currentIndex * (100 / 1)}%)`
            }}>


            {/* CAROUSEL IMAGES HERE */}
            {url.map((u, idx) => <ExpandedAndMore key={idx} url={u} />)}


          </div>
        </div>

        {currentIndex < (length - 1) &&
          <a class="carousel-control-next" onClick={next} >
            <span class="carousel-control-next-icon"></span>
            <span class="sr-only" >Next</span>
          </a>}

      </div>
      <ol className="carousel-indicators">
        {Array(length).fill(1).map((indicator, index) => {
          return <li
            className={index === currentIndex ? "active" : ""}
            key={index}
            onClick={() => setCurrentIndex(index)}
          />
        })}
      </ol>
      <button type="button" class="btn-close" onClick={() => changeView('default')}></button>
    </>
  )
}

export default Expanded;
