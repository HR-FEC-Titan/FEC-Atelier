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
      avg: []
    }
  }

  total = () =>{
    return this.state.five + this.state.four + this.state.three + this.state.two + this.state.one;
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
    <div>{this.state.avg}</div>
    <div>Total Reviews: {this.total()}</div>
    <div>{this.state.recs}% of reviews recommend this product</div>
    <div>5 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.five/this.total() * 100} /> {this.state.five}</div>
    <div>4 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.four/this.total() * 100} /> {this.state.four}</div>
    <div>3 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.three/this.total() * 100} /> {this.state.three}</div>
    <div>2 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.two/this.total() * 100} /> {this.state.two}</div>
    <div>1 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.one/this.total() * 100} /> {this.state.one}</div>
    </div>
    )
  }
}

export default Rating;