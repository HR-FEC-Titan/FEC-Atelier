import React from 'react';
import { useState, useEffect } from 'react';
import '../../../dist/relatedProdsStyle.css';


const YourOutfitCarousel = (props) => {
  const { children, show } = props;
  const [touchPosition, setTouchPosition] = useState(null);

  const next = () => {
    if (props.currentOutfitIndex < (props.outfitListLength - show)) {
      props.setCurrentOutfitIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (props.currentOutfitIndex > 0) {
      props.setCurrentOutfitIndex(prevState => prevState - 1)
    }
  }

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  }

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {
          props.currentOutfitIndex > (0) &&
          <button className="left-arrow" onClick={ prev } >
            &lt;
          </button>
        }
        <div className="carousel-content-wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} >
          <div className={`carousel-content show-${show}`} style={{ transform: `translateX(-${props.currentOutfitIndex * (100 / show)}%)` }} >
            { props.children }
          </div>
        </div>
        {
          props.currentOutfitIndex < (props.outfitListLength - show) &&
          <button className="right-arrow" onClick={ next } >
              &gt;
          </button>
        }
      </div>
    </div>
  )
}

export default YourOutfitCarousel;