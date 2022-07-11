import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { StyleContext } from './Overview.jsx';
import Price from './Price.jsx';

export const IndexContext = createContext(0); // default to first style

let Style = () => {
  const styles = useContext(StyleContext);
  console.log(styles);
  const [index, setIndex] = useState(0);

  return (
  <div className="styles">

    <IndexContext.Provider value={0}>
      <Price />

    </IndexContext.Provider>


    {styles.map((s, index) => {
      return <>
      <img key={index} src={s.photos[0].thumbnail_url} width="50px" height="50px"/>

      </>
    })}


  </div>
  )
}

export default Style;