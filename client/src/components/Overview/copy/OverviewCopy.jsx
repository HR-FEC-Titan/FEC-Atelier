import React from 'react';
import { useState, useEffect, useContext, createContext, lazy, Suspense, } from 'react';
import axios from 'axios';

import styleData from './data.json';


export const ViewContext = createContext();
export const StyleContext = createContext();
const TitCatSlogan = lazy(() => import('./TitCatSlogan.jsx'));
const StarReview = lazy(() => import('./StarReview.jsx'));
const Style = lazy(() => import('./Style.jsx'));
const Expanded = lazy(() => import('./Expanded.jsx'));


var Overview = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);  // Image Index
  const [styles, setStyles] = useState(styleData.results); // Style Index

  useEffect(() => {
    axios.get(`/products/${id}/styles`)
      .then(res => {
        setStyles(res.data.results);
      })
  }, [id])

  const defaultStyleIndex = styles.reduce((memo, style, index) => {
    if (style.default === true) {
      memo = index;
    }
    return memo;
  }, 0)

  const [styleIndex, setStyleIndex] = useState(defaultStyleIndex);
  const [currentStyle, setCurrentStyle] = useState(styles[styleIndex]);

  useEffect(() => {
    setCurrentStyle(styles[styleIndex])
  }, [styles, styleIndex]);


  const [view, setView] = useState("default");

  const changeView = (name) => {
      console.log("Changing view to: " + name);
      setView(name);
  };

  const renderView = () => {
    switch (view) {
      case "default":
        return (<div className='defaultView' >
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
        </div>);

      case "expanded":
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
        );
    }

  }



  return (
    <Suspense fallback={<p>Loading...</p>}>{renderView()}</Suspense>
  );
}


export default Overview;