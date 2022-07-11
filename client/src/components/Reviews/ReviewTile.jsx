import React from 'react';

let ReviewTile = ({review}) => {
  return <div>
    <p>Stars: {review.rating}</p>
    <p>{review.reviewer_name}, {review.date}</p>
    <p>Summary:<b>{review.summary}</b></p>
    <p>Body:<b>{review.body}</b></p>
    {review.recommend ? <p>I recommend this product</p> : <p></p>}
    {review.response ? <p>Responce from seller: {review.response}</p> : <p></p>}
  <hr/>
  </div>

}

export default ReviewTile;