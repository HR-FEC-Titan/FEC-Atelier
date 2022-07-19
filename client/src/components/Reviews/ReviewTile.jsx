import React from 'react';
import {useState} from 'react'

let ReviewTile = ({review}) => {
  const [showMore, setShowMore] = useState(false);
  if(review.summary.length + review.body.length <= 300 ) {
  return (<div>
    <p>Stars: {review.rating} {review.reviewer_name} {review.date}</p>
    <p><b>{review.summary}</b></p>
    <p>{review.body}</p>
    {review.recommend ? <p>I recommend this product</p>: <></>}
    {review.response ? <p>Responce from seller: {review.response}</p> : <></>}
    <p>Was this review helpful? Yes {review.helpfulness} | <span className = 'report'>Report</span></p>
  <b><hr/></b>
  </div>
  )
  } else {
    return (<div>
      <p>Stars: {review.rating}</p>
      <p>{review.reviewer_name}, {review.date}</p><br>
      </br>
      <p><b>{review.summary}</b></p><br>
      </br>
      <p>{showMore ? review.body : review.body.slice(0, 250)}</p><br>
      </br>
      <button onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button>

      {review.recommend ? <p>I recommend this product</p>: <></>}
      {review.response ? <p>Responce from seller: {review.response}</p> : <></>}
      <p>Was this review helpful? Yes {review.helpfulness} | <span className = 'report'>Report</span></p>
    <hr/>
    </div>
    )
  }
}

export default ReviewTile;