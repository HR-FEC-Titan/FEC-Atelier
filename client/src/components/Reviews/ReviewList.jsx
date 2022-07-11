import React from 'react';
import ReviewTile from './ReviewTile.jsx';

let ReviewList = ({reviews}) => {
  return (
    <div>
    {reviews.map(review => {
      return <ReviewTile key = {review.review_id} review={review}/>
    })}
    </div>
  )
}

export default ReviewList;