import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { IndexContext } from './Style.jsx';
import { StyleContext } from './Overview.jsx';



const Price = () => {
  const index = useContext(IndexContext);
  const styles = useContext(StyleContext);
  const currentStyle = styles[index];


  return <div className="priceAndStyle">
    <div><small> Original Price: {currentStyle.original_price}; </small></div>
    <div><small> Sale Price is {currentStyle.sale_price} </small></div>
    <small><b> STYLE > {currentStyle.name} </b></small>

  </div>
}

export default Price;