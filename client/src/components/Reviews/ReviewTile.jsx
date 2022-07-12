import React from 'react';

let ReviewTile = ({review}) => {
  if(review.summary.length + review.body.length <= 250) {;
  return (<div>
    <p>Stars: {review.rating}</p>
    <p>{review.reviewer_name}, {review.date}</p><br>
    </br>
    <p><b>{review.summary}</b></p><br>
    </br>
    <p>{review.body}</p><br>
    </br>
    {review.recommend ? <p>I recommend this product</p>: <></>}
    {review.response ? <p>Responce from seller: {review.response}</p> : <></>}
    <p>Was this review helpful? Yes {review.helpfulness} | <span className = 'report'>Report</span></p>
  <hr/>
  </div>
  )
  } else {
    return (<div>
      <p>Stars: {review.rating}</p>
      <p>{review.reviewer_name}, {review.date}</p><br>
      </br>
      <p><b>{review.summary}</b></p><br>
      </br>
      <p>{review.body}</p><br>
      </br>
      <button>Show more</button>
      {review.recommend ? <p>I recommend this product</p>: <></>}
      {review.response ? <p>Responce from seller: {review.response}</p> : <></>}
      <p>Was this review helpful? Yes {review.helpfulness} | <span className = 'report'>Report</span></p>
    <hr/>

    </div>

    )
  }
}

export default ReviewTile;