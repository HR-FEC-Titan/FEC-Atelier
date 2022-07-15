import React, { useEffect, useState } from 'react';

const Carousel = (props) => {
  const { children, show, infiniteLoop } = props

  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0)
  const [length, setLength] = useState(children.length)

  const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const [touchPosition, setTouchPosition] = useState(null)

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length)
    setIsRepeating(infiniteLoop && children.length > show)
  }, [children, infiniteLoop, show])

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true)
      }
    }
  }, [currentIndex, isRepeating, show, length])

  const next = () => {
    if (isRepeating || currentIndex < (length - show)) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e) => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false)
        setCurrentIndex(length)
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false)
        setCurrentIndex(show)
      }
    }
  }

  const renderExtraPrev = () => {
    let output = []
    for (let index = 0; index < show; index++) {
      output.push(children[length - 1 - index])
    }
    output.reverse()
    return output
  }

  const renderExtraNext = () => {
    let output = []
    for (let index = 0; index < show; index++) {
      output.push(children[index])
    }
    return output
  }

  return (
    <React.Fragment>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {/* You can alwas change the content of the button to other things */}
          {
            (isRepeating || currentIndex > 0) &&
            <button onClick={prev} className="image-left-arrow">
              &lt;
            </button>
          }
          <div
            className="carousel-content-wrapper"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div
              className={`carousel-content`}
              style={{
                transform: `translateX(-${currentIndex * (100 / show)}%)`,
                transition: !transitionEnabled ? 'none' : undefined,
              }}
              onTransitionEnd={() => handleTransitionEnd()}
            >
              {
                (length > show && isRepeating) &&
                renderExtraPrev()
              }
              {children}
              {
                (length > show && isRepeating) &&
                renderExtraNext()
              }
            </div>
          </div>
          {/* You can alwas change the content of the button to other things */}
          {
            (isRepeating || currentIndex < (length - show)) &&
            <button onClick={next} className="image-right-arrow">
              &gt;
            </button>
          }
        </div>
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
              className={`t-carousel-content show-${show}`}
              style={{
                transform: `t-translateY(-${currentIndex * (100 / show)}%)`
              }}
            >

              {children}

            </div>
          </div>

          {/* ================  hide buttons for now =================*/}
          {/* {currentIndex < (length - show) &&
            <button onClick={next} className="t-image-down-arrow">
              &#8964;
            </button>} */}
        </div>
      </div>

    </React.Fragment>
  )
}

export default Carousel;

const ThumbnailCarousel = (props) => {
  // use currentIndex from main Carousel to apply highlighted border to thumbnail

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

    )
}

// export default ThumbnailCarousel;