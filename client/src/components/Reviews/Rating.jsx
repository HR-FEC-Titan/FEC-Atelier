import React from "react";
import axios from "axios";
import ProgressBar from './ProgressBar.jsx'


class Rating extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      meta: [],
      ratings: [],
      five: [],
      four: [],
      three: [],
      two: [],
      one:[],
      recs: [],
      avg: [],
      filter: [],

    }
  }

  total = () =>{
    return this.state.five + this.state.four + this.state.three + this.state.two + this.state.one;
  }

  handleClick = (e) => {
      this.setState({
        filter: e.target.id
      })
  }

  componentDidUpdate(pP, pS){
    if(pS.filter !== this.state.filter){
      this.props.update(this.state.filter)
    }
  }



  componentDidMount(){
    axios.get(`/reviews/meta?product_id=${this.props.id}`)
    .then(res => {
      let meta = res.data;
      let ratings = res.data.ratings
      let avg = () => {
        var total = 0;
        var sum = 0;
        var obj = res.data.ratings;
        for (var key in res.data.ratings) {
          total += Number(res.data.ratings[key]);
          sum +=  Number(res.data.ratings[key]) * key;
        }
        return  (sum/total).toFixed(1)
      }
      let five = Number(res.data.ratings[5]) || 0
      let four = Number(res.data.ratings[4]) || 0
      let three = Number(res.data.ratings[3]) || 0
      let two = Number(res.data.ratings[2]) || 0
      let one = Number(res.data.ratings[1]) || 0
      let recs = ((Number(res.data.recommended.true)/(Number(res.data.recommended.false) + Number(res.data.recommended.true))) * 100).toFixed(2)
      this.setState({ five, four, three, two, one, meta, recs, ratings, avg: Number(avg())})
    })
  }


  render() {
    return (
      <div>
    <div>{this.state.avg}
            <input
            className="rating"
            max="5" readOnly step="0.25"
            style={{
              "--fill": "gold",
              "--value": this.state.avg,
              "--starsize": "1rem",
              "display": "inline-block",
            }}
            type="range" /></div>
    <div>Total Reviews: {this.total()}</div>
    <div>Rating Breakdown:</div>
    {this.state.filter.length ? <div>Current Filters: {this.state.filter} stars <a href=""> Remove all Filters</a> </div> : <></>}
    <div id="5" onClick={this.handleClick} >5 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.five/this.total() * 100} /> {this.state.five}</div>
    <div id="4" onClick={this.handleClick} >4 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.four/this.total() * 100} /> {this.state.four}</div>
    <div id="3" onClick={this.handleClick} >3 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.three/this.total() * 100} /> {this.state.three}</div>
    <div id="2" onClick={this.handleClick} >2 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.two/this.total() * 100} /> {this.state.two}</div>
    <div id="1" onClick={this.handleClick} >1 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.one/this.total() * 100} /> {this.state.one}</div>
    <div>{this.state.recs}% of reviews recommend this product</div>
    </div>
    )
  }
}

export default Rating;