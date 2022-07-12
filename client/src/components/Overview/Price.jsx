import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { StyleIndexContext, StylesContext } from './Style.jsx';


const Price = () => {
  const styleIndex = useContext(StyleIndexContext);
  const styles = useContext(StylesContext);
  const currentStyle = styles[styleIndex];


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