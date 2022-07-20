import React from "react";
import ReviewList from './ReviewList.jsx';
import axios from "axios";

class Sort extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: [],
      value: "relevant",
    }
  }

  componentDidMount() {
    axios.get(`reviews?page=1&count=5000&sort=${this.state.value}&product_id=${this.props.id}`)
    .then(res => {
      let filter = res.data.results
      console.log(filter)
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

  componentDidUpdate(pP, pS){
    console.log("this is Pp", pP)
    console.log("this is pS", pS)
    if(pP.id !== this.props.id){
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
    if(this.props.number === '') {
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
    } else {
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
            <ReviewList id={this.props.id} reviews={this.state.filter.filter(review =>{return review.rating === Number(this.props.number)})} />
          </div>
        </>
      )
    }
  }
}




export default Sort;