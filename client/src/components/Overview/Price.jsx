import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { IndexContext } from './Style.jsx';
import { StyleContext } from './Overview.jsx';



const Price = () => {
  const index = useContext(IndexContext);
  const styles = useContext(StyleContext);

  return <div>
    <div>Showing style: {index}; </div>
    <div>Original Price: {styles[index].original_price}; </div>
    <div>Sale Price is {styles[index].sale_price}</div>
  </div>
}

export default Price;