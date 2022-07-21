import React from 'react';
import ReviewList from './ReviewList.jsx';
import axios from 'axios'
import Sort from './Sort.jsx'
import Rating from './Rating.jsx'

class Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
    }
  }

  // componentDidMount(){
  //   axios.get(`reviews?page=1&count=5000&product_id=${this.props.id}`)
  //     .then(res => {
  //       let reviews = res.data.results
  //       console.log(reviews)
  //       this.setState({reviews})
  //     })
  //     .catch(err => console.log(err))
  // }

  update=(e)=>{
    console.log(e)
    this.setState({
      reviews: e
    })
  }


  render() {
    return (
      <div onClick={e => this.props.postClickingEvent(e, 'Ratings & Reviews')}>

        <h4 style={{ margin: "18px 8px", "font-size": "15px" }}>RATINGS & REVIEWS</h4>

        <div className='reviews' id="reviews">
          {/* right half */}
          <div className="reviewPanel">
            <Sort number = {this.state.reviews}id={this.props.id} />
          </div>

          {/* left half */}
          <div className="ratingBreakDown">
            <Rating update ={this.update}id = {this.props.id}/>
          </div>


        </div>
      </div>
    )
  }
}


export default Reviews;