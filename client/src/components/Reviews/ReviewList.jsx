import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      count: 2,
      tot: this.props.reviews.length
    }
  }
  render() {
  if(this.props.reviews.length > 2) {
    return (
      <div>
      {this.props.reviews.slice(0, this.state.count).map(review => {
        return <ReviewTile key = {review.review_id} review={review}/>
      })}
      <button onClick = {()=>{
       this.setState({count: this.state.count+=2})
      }}>MORE REVIEWS</button> <button>ADD A REVIEW</button>
      </div>
    )
    } else {
      return (
        <div>
        {this.props.reviews.map(review => {
          return <ReviewTile key = {review.review_id} review={review}/>
        })}
      <button>MORE REVIEWS</button>
        </div>

      )
    }
  }
}

export default ReviewList;

