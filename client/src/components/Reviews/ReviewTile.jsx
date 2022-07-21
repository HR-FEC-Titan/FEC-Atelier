import React from 'react';
import { useState } from 'react'

let ReviewTile = ({ review }) => {
  const [showMore, setShowMore] = useState(false);
  // if(review.summary.length + review.body.length <= 300 ) {
  // return (<div>
  //   <p>Stars: {review.rating} {review.reviewer_name} {review.date}</p>
  //   <p><b>{review.summary}</b></p>
  //   <p>{review.body}</p>
  //   {review.recommend ? <p>I recommend this product</p>: <></>}
  //   {review.response ? <p>Responce from seller: {review.response}</p> : <></>}
  //   <p>Was this review helpful? Yes {review.helpfulness} | <span className = 'report'>Report</span></p>
  // <b><hr/></b>
  // </div>
  // )
  // } else {
  //   return (<div>
  //     <p>Stars: {review.rating}</p>
  //     <p>{review.reviewer_name}, {review.date}</p><br>
  //     </br>
  //     <p><b>{review.summary}</b></p><br>
  //     </br>
  //     <p>{showMore ? review.body : review.body.slice(0, 250)}</p><br>
  //     </br>
  //     <button onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button>

  //     {review.recommend ? <p>I recommend this product</p>: <></>}
  //     {review.response ? <p>Responce from seller: {review.response}</p> : <></>}
  //     <p>Was this review helpful? Yes {review.helpfulness} | <span className = 'report'>Report</span></p>
  //   <hr/>
  //   </div>

  if (review.summary.length + review.body.length <= 300) {
    return (
      <div className="individualReview">
        <div className="starReviewerDate">
          <input
            className="rating"
            max="5" readOnly step="0.25"
            style={{
              "--fill": "gold",
              "--value": review.rating,
              "--starsize": "1rem",
              "display": "inline-block",
            }}
            type="range" />

          <small>{review.reviewer_name}, {review.date}</small>
        </div>

        <div className="summary">{review.summary}</div>

        <div className="reviewBody">{review.body}</div>

        <div className="recResHelpful">
          {review.recommend && <div className="others">✔ I recommend this product</div>}
          {review.response && <div className="others">Responce from seller: {review.response}</div>}
          <div className="others">
            Was this review helpful?
            <a href=""> Yes</a> {review.helpfulness}   |   <a className='report' href="">Report</a>
          </div>
        </div>

      </div>
    )
  } else {
    return (
      <div className="individualReview">
        <div className="starReviewerDate">
          <input
            className="rating"
            max="5" readOnly step="0.25"
            style={{
              "--fill": "gold",
              "--value": review.rating,
              "--starsize": "1rem",
              "display": "inline-block",
            }}
            type="range" />

          <small>{review.reviewer_name}, {review.date}</small>
        </div>


        <div className="summary">{review.summary}</div>

        <div className="reviewBody">{showMore ? review.body : review.body.slice(0, 250)}</div>
        <div onClick={() => setShowMore(!showMore)} className="showMore">
          {showMore ? "Show less" : "Show more"}
        </div>


        <div className="recResHelpful">
          {review.recommend && <div className="others">✔ "I recommend this product</div>}
          {review.response && <div className="others">Responce from seller: {review.response}</div>}
          <div className="others">
            Was this review helful?
            <a href=""> Yes</a> {review.helpfulness}   |   <a className='report' href="">Report</a>
          </div>
        </div>

      </div>
    )
  }
}

export default ReviewTile;