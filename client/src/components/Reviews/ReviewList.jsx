import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import Modal from './Modal.jsx'
import Form from './Form.jsx'

class ReviewList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      count: 2,
      show: false
    }
  }

  showModal = e =>{
    this.setState({
      show: !this.state.show
    })
  }

  render() {
  if(this.props.reviews.length > 2 && this.state.count < this.props.reviews.length) {
    return (
      <div>
      {this.props.reviews.slice(0, this.state.count).map(review => {
        return <ReviewTile key = {review.review_id} review={review}/>
      })}
      <Modal onClose={this.showModal} show={this.state.show}><Form/></Modal>
      <button onClick = {()=>{
       this.setState({count: this.state.count+=2})
      }}>MORE REVIEWS</button> <button onClick={e => {this.showModal()}}>ADD A REVIEW</button>
      </div>
    )
    }
    if(this.state.count >= this.props.reviews.length) {
      return (
        <div>
        {this.props.reviews.slice(0, this.state.count).map(review => {
          return <ReviewTile key = {review.review_id} review={review}/>
        })}
        <Modal onClose={this.showModal} show={this.state.show}><Form/></Modal>
       <button onClick={e => {this.showModal()}}>ADD A REVIEW</button>
        </div>
      )
    }
  }
}

export default ReviewList;

