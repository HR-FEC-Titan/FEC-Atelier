import React from 'react';
import ReviewList from './ReviewList.jsx';
import axios from 'axios'

class Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
    }
  }

  componentDidMount(){
    axios.get(`/reviews/?product_id=${this.props.id}`)
      .then(res => {
        let reviews = res.data.results
        console.log(reviews)
        this.setState({reviews})
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div className='reviews'>
        <h3>RATINGS & REVIEWS</h3>
        <ReviewList id ={this.props.id} reviews = {this.state.reviews}/>
      </div>
      )
  }
}


export default Reviews;