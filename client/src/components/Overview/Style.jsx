import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { StyleContext } from './Overview.jsx';

import Price from './Price.jsx';
import SizeQtyAddShare from './SizeQtyAddShare.jsx';
import Image from './Image.jsx';

export const CurrentStyleContext = createContext();

let Style = () => {
  const { styles, setStyles, styleIndex, setStyleIndex, currentStyle } = useContext(StyleContext);


  return (

    <React.Fragment>
      <CurrentStyleContext.Provider value={currentStyle}>
        <Price />
        <SizeQtyAddShare />
        <Image />
      </CurrentStyleContext.Provider>

      <div className='styles'>
        {styles.map((s, i) => {
          return <div className="styleColumn" key={i} >

            <input
              type="radio"
              className="styleSelector"
              id={`Style${i}`}
              checked={i === styleIndex ? true : false}
              onChange={() => setStyleIndex(i)}
              hidden
            />

            <label className="" htmlFor={`Style${i}`}>
              <img
                className="styleIcon"
                src={s.photos[0].thumbnail_url}
              />
            </label>

          </div>
        })}

      </div>

    </React.Fragment>

  )
}


export default Style;


{/* <div class="categories-wrapper">
  <img src='https://66.media.tumblr.com/4f3cbb1b66a76a19a9794a162373abc5/tumblr_inline_n258pbAEBc1qhwjx8.png' alt='Random image' />
  <input class='category-input' type="checkbox" id='checker' name="categories[]" value="" />
  <label for="checker"></label>
  <input type="hidden" name="categoryFiles[]" value="" />
</div> */}