import React from "react";
import ReviewList from './ReviewList.jsx';
import axios from "axios";

class Sort extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: [],
      five: [],
      four: [],
      three: [],
      two: [],
      one: [],
      value: "relevant"
    }
  }

  componentDidMount() {
    axios.get(`reviews?page=1&count=5000&sort=${this.state.value}&product_id=${this.props.id}`)
    .then(res => {
      let filter = res.data.results
      console.log(filter)
      filter.forEach(review => {
        if(review.rating === 1) this.state.one.push(review)
        if(review.rating === 2) this.state.two.push(review)
        if(review.rating === 3) this.state.three.push(review)
        if(review.rating === 4) this.state.four.push(review)
        if(review.rating === 5) this.state.five.push(review)
      })
      this.setState({filter})
    })
    .catch(err => console.log(err))
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  componentDidUpdate(pP, pS){
    if(pS.value !== this.state.value){
    axios.get(`reviews?page=1&count=5000&sort=${this.state.value}&product_id=${this.props.id}`)
    .then(res => {
      let filter = res.data.results;
      console.log(filter)
      this.setState({filter})
    })
    .catch(err => console.log(err))
   }
  }
  render(){
    return (
      <>
        <div className="sortedBy">
          <label htmlFor="filter">{this.state.filter.length} reviews, sorted by  </label>
          <select name="filter" id="filter" onChange={this.handleChange} value={this.state.value} className="sortedByDropdown">
            <option value="relevant">Relevance</option>
            <option value="helpful">Helpfulness</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="reviewList">
          <ReviewList id={this.props.id} reviews={this.state.filter} />
        </div>
      </>
    )
  }
}




export default Sort;