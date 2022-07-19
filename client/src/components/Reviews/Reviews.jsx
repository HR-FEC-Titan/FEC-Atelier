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


  render() {
    return (
      // <div className='reviews'>
      //   <h3>RATINGS & REVIEWS</h3>
      //   <Sort id = {this.props.id}/>
        // <Rating id = {this.props.id}/>

      // </div>

      // )
      <>
        <h3 style={{margin: "18px 8px"}}>RATINGS & REVIEWS</h3>

        <div className='reviews'>

          {/* right half */}
          <div className="reviewPanel">
            <Sort id={this.props.id} />
          </div>

          {/* left half */}
          <div className="ratingBreakDown">
            {/* <div>stars: </div>
            <div> % of reviews recommend this product </div>
            <div>Bars: </div> */}
            <Rating id = {this.props.id}/>

            <div> Size: too small or too large </div>
            <div> Comfort: poor or perfect </div>
          </div>


        </div>
      </>
    )
  }
}


export default Reviews;