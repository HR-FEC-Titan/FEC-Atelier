import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

import StarReview from './StarReview.jsx';
import TitCatSlogan from './TitCatSlogan.jsx';
import Style from './Style.jsx';
import Image from './Image.jsx';

// createContext and export
export const ProductIDContext = createContext();

var Overview = ({ id }) => {


  // useEffect(() => {
  //   axios.get(`/products/${id}`)
  //     .then(res => {
  //       setProduct(res.data);
  //     })
  //   axios.get(`/products/${id}/styles`)
  //     .then(res => {

  //       console.log(styles);
  //       setStyles(res.data.results);
  //       axios.get(`/reviews/meta`, { params: { product_id: id } })
  //         .then(res => {
  //           setReviews(res.data.ratings);
  //         })
  //     })
  //   // axios.get(`/reviews/meta`, { params: { product_id: id } })
  //   //   .then(res => {
  //   //     console.log(styles);
  //   //     setReviews(res.data.ratings);
  //   //   })
  // }, [id]);

  return (
    <div className='overview'>

      {/* <ProductIDContext.Provider value={product}>
        <TitleCategory />
        <Slogan />
      </ProductIDContext.Provider>


      <ReviewContext.Provider value={styles}>
        <StarReview />
      </ReviewContext.Provider>


      <StyleContext.Provider value={reviews} >
        <Style />
      </StyleContext.Provider> */}


      <ProductIDContext.Provider value={id}>
        <TitCatSlogan />
        <StarReview />
        <Style />
      </ProductIDContext.Provider>

    </div>

  )
}

export default Overview;