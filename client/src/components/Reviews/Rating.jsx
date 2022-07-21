import React from "react";
import axios from "axios";
import ProgressBar from './ProgressBar.jsx'


class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meta: "",
      characteristics: {},
      ratings: [],
      five: [],
      four: [],
      three: [],
      two: [],
      one: [],
      recs: [],
      avg: [],
      filter: [],

    }
  }

  total = () => {
    return this.state.five + this.state.four + this.state.three + this.state.two + this.state.one;
  }

  handleClick = (e) => {
    let newFilter = this.state.filter.slice();
    // let newFilter = this.state.filter.filter(e => e!== e)

    console.log(newFilter[e])
    // newFilter.filter(e=>return !e)
    // if (newFilter[e]){
    //   delete newFilter[e]

    // }
    newFilter.push(e)
    this.setState({
      filter: newFilter})
    }
  // handleClick = (starNum) => {
  //   this.setState({
  //     filter: starNum
  //   })
  // }

  componentDidUpdate(pP, pS) {
    if (pS.filter !== this.state.filter) {
      this.props.update(this.state.filter)
    }
    if(pP.id !== this.props.id) {
      axios.get(`/reviews/meta?product_id=${this.props.id}`)
      .then(res => {
        let meta = res.data;
        let characteristics = res.data.characteristics;
        this.setState({ characteristics });
        let ratings = res.data.ratings;
        let avg = () => {
          var total = 0;
          var sum = 0;
          var obj = res.data.ratings;
          for (var key in res.data.ratings) {
            total += Number(res.data.ratings[key]);
            sum += Number(res.data.ratings[key]) * key;
          }
          return (sum / total).toFixed(1)
        }
        let five = Number(res.data.ratings[5]) || 0
        let four = Number(res.data.ratings[4]) || 0
        let three = Number(res.data.ratings[3]) || 0
        let two = Number(res.data.ratings[2]) || 0
        let one = Number(res.data.ratings[1]) || 0
        let recs = ((Number(res.data.recommended.true) / (Number(res.data.recommended.false) + Number(res.data.recommended.true))) * 100).toFixed(2)
        this.setState({ five, four, three, two, one, meta, recs, ratings, avg: avg() })
      })
    }
  }

  componentDidMount() {
    axios.get(`/reviews/meta?product_id=${this.props.id}`)
      .then(res => {
        let meta = res.data;
        let characteristics = res.data.characteristics;
        this.setState({ characteristics });
        let ratings = res.data.ratings;
        let avg = () => {
          var total = 0;
          var sum = 0;
          var obj = res.data.ratings;
          for (var key in res.data.ratings) {
            total += Number(res.data.ratings[key]);
            sum += Number(res.data.ratings[key]) * key;
          }
          return (sum / total).toFixed(1)
        }
        let five = Number(res.data.ratings[5]) || 0
        let four = Number(res.data.ratings[4]) || 0
        let three = Number(res.data.ratings[3]) || 0
        let two = Number(res.data.ratings[2]) || 0
        let one = Number(res.data.ratings[1]) || 0
        let recs = ((Number(res.data.recommended.true) / (Number(res.data.recommended.false) + Number(res.data.recommended.true))) * 100)
        this.setState({ five, four, three, two, one, meta, recs, ratings, avg: avg() })
      })
  };

  render() {
    return (
      <div>
        <div className="reviewNumber"> Total Reviews: {this.total()} </div>
        <div className="reviewStars">
          <div className="starNum"> {this.state.avg} </div>
          <input
            className="rating"
            max="5" readOnly step="0.25"
            style={{
              "--fill": "gold",
              "--value": this.state.avg,
              "--starsize": "1.2rem",
              "display": "inline-block",
            }}
    //         type="range" /></div>
    // <div>Total Reviews: {this.total()}</div>
    // <div>Rating Breakdown:</div>
    // {this.state.filter.length ? <div>Current Filters: {this.state.filter} stars <p onClick={()=>{this.setState({filter: []})}}> Remove all Filters</p> </div> : <></>}
    // <div id="5" onClick={this.handleClick} >5 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.five/this.total() * 100} /> {this.state.five}</div>
    // <div id="4" onClick={this.handleClick} >4 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.four/this.total() * 100} /> {this.state.four}</div>
    // <div id="3" onClick={this.handleClick} >3 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.three/this.total() * 100} /> {this.state.three}</div>
    // <div id="2" onClick={this.handleClick} >2 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.two/this.total() * 100} /> {this.state.two}</div>
    // <div id="1" onClick={this.handleClick} >1 stars <ProgressBar bgcolor={"#00695c"} completed={this.state.one/this.total() * 100} /> {this.state.one}</div>
    // <div>{this.state.recs}% of reviews recommend this product</div>
    // </div>
            type="range" />
        </div>

        {/* <div className="reviewRec" >
          {Math.floor(this.state.recs)}% of reviews recommend this product
        </div> */}

        {/* *****************   REMOVE ******************/}
        <div className="reviewNumber">Rating Breakdown:</div>
        {this.state.filter.length ? <div className="reviewNumber">Current Filters: {this.state.filter} stars <p onClick={() => { this.setState({ filter: [] }) }}> Remove all Filters</p> </div> : <></>}



        <div className="reviewLabel" id="5" onClick={() => this.handleClick(5)}>
          <div> 5 stars </div>
          <ProgressBar completed={this.state.five / this.total() * 100} />
          <div> {this.state.five} </div>
        </div>

        <div className="reviewLabel" id="4" onClick={() => this.handleClick(4)}>
          <div> 4 stars </div>
          <ProgressBar completed={this.state.four / this.total() * 100} />
          <div> {this.state.four} </div>
        </div>

        <div className="reviewLabel" id="3" onClick={() => this.handleClick(3)}>
          <div> 3 stars </div>
          <ProgressBar completed={this.state.three / this.total() * 100} />
          <div> {this.state.three} </div>
        </div>

        <div className="reviewLabel" id="2" onClick={() => this.handleClick(2)}>
          <div> 2 stars </div>
          <ProgressBar completed={this.state.two / this.total() * 100} />
          <div> {this.state.two} </div>
        </div>

        <div className="reviewLabel" id="1" onClick={() => this.handleClick(1)} style={{ "margin-bottom": "30px" }}>
          <div> 1 stars </div>
          <ProgressBar completed={this.state.one / this.total() * 100} />
          <div> {this.state.one} </div>
        </div>
        <div className="reviewRec" >
          {Math.floor(this.state.recs)}% of reviews recommend this product
        </div>

        {Object.keys(this.state.characteristics).length && Object.keys(this.state.characteristics).map((feature, index) => {
          const left = Number(this.state.characteristics[feature].value).toFixed(1);
          const percent = left / 5 * 100;

          const characteristicStandards = {
            Size: ["Too small", "Perfect", "Too wide"],
            Width: ["Too narrow", "Perfect", "Too wide"],
            Comfort: ["Uncomfortable", "Ok", "Perfect"],
            Quality: ["Poor", 'What I expected', 'Perfect'],
            Length: ['Runs short', 'Perfect', 'Runs long'],
            Fit: ['Runs tight', 'Perfect', 'Runs long']
          }
          const standards = characteristicStandards[feature];

          return <div>
            <div className="feature" style={{"font-size": "15px"}}> {feature} </div>
            <div className="characteristics">
              <div className="bar"></div>
              <div
                className="triangle"
                style={{ left: `${percent}%` }}>
              </div>
              <div className="standards">
                {standards.map((s, i) => {
                  return <div key={i}>{s}</div>
                })}
              </div>
            </div>
          </div>
        })}

      </div >
    )
  }
}

export default Rating;

