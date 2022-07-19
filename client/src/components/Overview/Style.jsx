import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';

import Price from './Price.jsx';
import SizeQtyAddShare from './SizeQtyAddShare.jsx';
import StyleIcon from './StyleIcon.jsx';
import DefaultImage from './DefaultImage.jsx';


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