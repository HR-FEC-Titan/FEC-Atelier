import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { IndexContext } from './Style.jsx';
import { StyleContext } from './Overview.jsx';



const Price = () => {
  const index = useContext(IndexContext);
  const styles = useContext(StyleContext);
  const currentStyle = styles[index];


  return <div className="priceAndStyle">
    {!currentStyle.sale_price ?
      <div> ${ Math.floor(currentStyle.original_price) } </div> :
      <div>
        <del>${ Math.floor(currentStyle.original_price) }</del>
        <span className="salePrice">${ Math.floor(currentStyle.sale_price) }</span>
      </div>
    }
    <div><small><b> STYLE > {currentStyle.name} </b></small></div>

  </div>
}

export default Price;