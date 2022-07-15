import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

import TitCatSlogan from './TitCatSlogan.jsx';
import StarReview from './StarReview.jsx';
import Style from './Style.jsx';
import Expanded from './Carousel/Expanded.jsx';
import styleData from './data.json';


export const ProductIDContext = createContext();
export const CurrentIndexContext = createContext();
export const ViewContext = createContext();
export const StyleContext = createContext();

var Overview = ({ id }) => {

  const [view, setView] = useState('default');
  const [currentIndex, setCurrentIndex] = useState(0);  // Image index
  const [styles, setStyles] = useState(styleData.results);

  useEffect(() => {
    axios.get(`/products/${id}/styles`)
      .then(res => {
        setStyles(res.data.results);
      })
  }, [])

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




  if (view === 'default') {
    return (<div className='defaultView'>
      <StyleContext.Provider
        value={{ styles, setStyles,
                styleIndex, setStyleIndex,
                currentStyle, setCurrentStyle,
                currentIndex, setCurrentIndex
      }} >
      <ViewContext.Provider value={{ view, setView }} >
        <ProductIDContext.Provider value={id}>
          <TitCatSlogan />
          <StarReview />
          <Style />
        </ProductIDContext.Provider>
      </ViewContext.Provider>
      </StyleContext.Provider>
    </div>)
  }

  else if (view === 'expanded') {
    return (
      <ViewContext.Provider value={{ view, setView }} >
        <StyleContext.Provider
        value={{ styles, setStyles,
                styleIndex, setStyleIndex,
                currentStyle, setCurrentStyle,
                currentIndex, setCurrentIndex
      }} >

        <Expanded />
      </StyleContext.Provider>
      </ViewContext.Provider>
      )
    }
  }

  export default Overview;

  {/* <div onClick={() => setView('default')} className="expandedView"> hello world!</div> */}