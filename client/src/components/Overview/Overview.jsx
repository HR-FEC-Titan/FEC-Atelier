import React from 'react';
import { useState, useEffect, useContext, createContext, Suspense, } from 'react';
import axios from 'axios';

import TitCatSlogan from './TitCatSlogan.jsx';
import StarReview from './StarReview.jsx';
import Style from './Style.jsx';
import Expanded from './Expanded.jsx';
import styleData from './data.json';

export const StyleContext = createContext();

var Overview = ({ id }) => {

  const [view, setView] = useState('default');
  const [styles, setStyles] = useState(styleData.results); // Style Index

  useEffect(() => {
    axios.get(`/products/${id}/styles`)
      .then(res => {
        setStyles(res.data.results);
      })
  }, [id]);

  const defaultIndex = styles.reduce((memo, style, index) => {
    if (style.default === true) {
      memo = index;
    }
    return memo;
  }, 0);

  const [styleIndex, setStyleIndex] = useState(defaultIndex);
  // If style changes =>  defaultIndex change
  useEffect(() => {
    setStyleIndex(defaultIndex)
  }, [styles]);


  const [currentStyle, setCurrentStyle] = useState(styles[styleIndex]);
  // CurrentStyle will change when styles or styleIndex change
  useEffect(() => {
    setCurrentStyle(styles[styleIndex])
  }, [styles, styleIndex])


  const [currentIndex, setCurrentIndex] = useState(0);  // Image Index
  // Switch to a new style, should verify if the new style has the nth images to display
  useEffect(() => {
    if (currentStyle.photos.length < currentIndex + 1) {
      setCurrentIndex(0);
    }
  });



  const changeView = (name) => {
    console.log("Changing view to: " + name);
    setView(name);
  };


  if (view === 'default') {
    return (<div className='defaultView'>
      <StyleContext.Provider
        value={{
          id,
          styles, setStyles,
          styleIndex, setStyleIndex,
          currentStyle, setCurrentStyle,
          currentIndex, setCurrentIndex,
          changeView
        }} >
        <Suspense fallback={<p>Loading Title and Category... </p>}>
          <TitCatSlogan />
          <Suspense fallback={<p>Loading Star and Review... </p>}>
            <StarReview />
            <Suspense fallback={<p>Loading Styles... </p>}>
              <Style />
            </Suspense>
          </Suspense>
        </Suspense>
      </StyleContext.Provider>
    </div>)
  }

  else if (view === 'expanded') {
    return (
      <div className='expandedView'>
        <StyleContext.Provider
          value={{
            styles, setStyles,
            styleIndex, setStyleIndex,
            currentStyle, setCurrentStyle,
            currentIndex, setCurrentIndex,
            changeView
          }} >

          <Expanded />
        </StyleContext.Provider>
      </div>
    )
  }

  else if (view === 'zoomedIn') {
    return (
      <div className="zoomedIn">
        <img
          src={currentStyle.photos[currentIndex].url}
          onClick={() => changeView('expanded')}
        />
      </div>
    )
  }
}

export default Overview;