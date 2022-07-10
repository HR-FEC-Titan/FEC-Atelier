import React, { useContext } from 'react';
import { ReviewContext } from './Overview.jsx';


let StarReview = () => {
  const review = useContext(ReviewContext);
  const arr = Object.entries(review);
  const sum = arr.reduce((memo, pair) => {
    return memo + Number(pair[0]) * Number(pair[1]);
  }, 0)

  const count = Object.keys(review);
  const counter = count.reduce((memo, ele) => {
    return memo + Number(ele)
  }, 0);

  return <div>

    <div>Star: {(sum / counter).toFixed(1)}</div>

    <a href="">Read all { counter } reviews</a>

  </div>
}

export default StarReview;