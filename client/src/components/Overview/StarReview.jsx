import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { ProductIDContext } from './Overview.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';



let StarReview = () => {

  const id = useContext(ProductIDContext);
  const [review, setReview] = useState([]);
  const arr = Object.entries(review);

  useEffect(() => {
    axios.get(`/reviews/meta`, { params: { product_id: id } })
      .then(res => {
        setReview(res.data.ratings);
      })
  }, [])

  if (!arr.length) {
    return null;
  } else {

    const totalStars = arr.reduce((memo, pair) => {
      return memo + Number(pair[0]) * Number(pair[1]);
    }, 0)

    const reviewCount = Object.values(review).reduce((memo, ele) => {
      return memo + Number(ele);
    }, 0);

    const average = Math.floor(totalStars / reviewCount);
    const empty = 5 - average;
    let stars = Array(average).fill(1).concat(Array(empty).fill(0));

    return (
      <div className="starAndReview">

        <small className="">Star: {(totalStars / reviewCount).toFixed(1)}</small>

        {stars.map((e, index) => {
          if (!e) {
            return <FontAwesomeIcon key={index} icon={emptyStar} />
          } else {
            return <FontAwesomeIcon key={index} icon={faStar} />
          }
        })}

        <a href="" className="readReview" style={{ "padding": "0 5px" }}><small>Read all {reviewCount} reviews</small></a>

      </div>
    )
  }
}

export default StarReview;


{/* <FontAwesomeIcon icon={faStarHalfStroke} /> */ }
