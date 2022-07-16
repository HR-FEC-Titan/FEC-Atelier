import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { StyleContext } from './Overview.jsx';


let StarReview = () => {

  const { id } = useContext(StyleContext);
  const [review, setReview] = useState([]);
  const arr = Object.entries(review);

  useEffect(() => {
    axios.get(`/reviews/meta`, { params: { product_id: id } })
      .then(res => {
        setReview(res.data.ratings);
      })
  }, [id])





  if (!arr.length) {
    return null;
  } else {
    const totalStars = arr.reduce((memo, pair) => {
      return memo + Number(pair[0]) * Number(pair[1]);
    }, 0)

    const reviewCount = Object.values(review).reduce((memo, ele) => {
      return memo + Number(ele);
    }, 0);

    // const average = Math.floor(totalStars / reviewCount);
    // const empty = 5 - average;
    // let stars = Array(average).fill(1).concat(Array(empty).fill(0));
    // (Math.round(totalStars/reviewCount * 4)/ 4).toFixed(2)

    return (
      <div className="starAndReview">

        <small className="">Star: {(totalStars / reviewCount).toFixed(1)} &nbsp;</small>

        <input
          className="rating"
          max="5" readOnly step="0.25"
          style={{
            "--fill": "gold",
            "--value": (totalStars / reviewCount).toFixed(1),
            "--starsize": "1rem",
            "display": "inline-block",
          }}
          type="range" />

        {/* using fontawesome star icons */}
        {/* {stars.map((e, index) => {
          if (!e) {
            return <FontAwesomeIcon key={index} icon={emptyStar} />
          } else {
            return <FontAwesomeIcon key={index} icon={faStar} />
          }
        })} */}

        <a href="" className="readReview" style={{ "padding": "0 5px" }} ><small>Read all {reviewCount} reviews</small></a>

      </div>
    )
  }
}

export default StarReview;


{/* <FontAwesomeIcon icon={faStarHalfStroke} /> */ }
