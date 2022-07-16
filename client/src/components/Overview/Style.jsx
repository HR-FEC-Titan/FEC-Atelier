import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { StyleContext } from './Overview.jsx';

import Price from './Price.jsx';
import SizeQtyAddShare from './SizeQtyAddShare.jsx';
import StyleIcon from './StyleIcon.jsx';
import DefaultImage from './DefaultImage.jsx';

export const CurrentStyleContext = createContext();

let Style = () => {
  return (
    <React.Fragment>
        <Price />
        <SizeQtyAddShare />
        <StyleIcon />
        <DefaultImage />
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