import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

import TitCatSlogan from './TitCatSlogan.jsx';
import StarReview from './StarReview.jsx';
import Style from './Style.jsx';

export const ProductIDContext = createContext();

var Overview = ({ id }) => {
  return (
    <div className='overview'>

      <ProductIDContext.Provider value={id}>
        <TitCatSlogan />
        <StarReview />
        <Style />
      </ProductIDContext.Provider>

    </div>
  )
}

export default Overview;