import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

import StarReview from './StarReview.jsx';
import TitleCategory from './TitleCategory.jsx';
import Slogan from './Slogan.jsx';
import Share from './Share.jsx';
import Style from './Style.jsx';
import Image from './Image.jsx';
import styleData from './data.json';

// createContext and export
export const ProductContext = createContext();
export const StyleContext = createContext();
export const ReviewContext = createContext();


var Overview = ({ id }) => {
  // states to be tracked
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState(styleData.results);
  const [reviews, setReviews] = useState({2: 3}); // have to give starting values to calculate average

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
    axios.get(`/products/${id}/styles`)
      .then(res => {
        setStyles(res.data.results);
      })
    axios.get(`/reviews/meta`, { params: { product_id: id } })
      .then(res => {
        setReviews(res.data.ratings);
      })
  }, []);

  return (
    <div className='overview'>
      <ProductContext.Provider value={product}>
        <TitleCategory />

        <ReviewContext.Provider value={reviews}>
          <StarReview />
        </ReviewContext.Provider>

        <StyleContext.Provider value={styles} >
          <Style />
          <Image />
        </StyleContext.Provider>

        <Slogan />
        <Share />
      </ProductContext.Provider>
    </div>

  )
}

export default Overview;