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
      avg: []
    }
  }

  total = () => {
    return this.state.five + this.state.four + this.state.three + this.state.two + this.state.one;
  }



  componentDidMount() {
    axios.get(`/reviews/meta?product_id=${this.props.id}`)
      .then(res => {
        let meta = res.data;
        console.log(meta.characteristics);
        let characteristics = res.data.characteristics;
        this.setState({ characteristics });
        let ratings = res.data.ratings
        let avg = () => {
          var total = 0;
          var sum = 0;
          var obj = res.data.ratings;
          for (var key in res.data.ratings) {
            total += Number(res.data.ratings[key]);
            sum += Number(res.data.ratings[key]) * key;
          }
          return (sum / total).toFixed(1);
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


  render() {
    return (
      <>
        <div className="reviewNumber">{this.total()} Total Reviews</div>

        <div className="reviewStars">
          <div className="starNum"> {this.state.avg}</div>
          <input
            className="rating"
            max="5" readOnly step="0.25"
            style={{
              "--fill": "gold",
              "--value": this.state.avg,
              "--starsize": "1.2rem",
              "display": "inline-block",
            }}
            type="range" />
        </div>

        <div className="reviewRec">
          {Math.floor(this.state.recs)}% of reviews recommend this product
        </div>

        <div className="reviewLabel">
          <div> 5 stars </div>
          <ProgressBar completed={this.state.five / this.total() * 100} />
          <div> {this.state.five} </div>
        </div>

        <div className="reviewLabel">
          <div> 4 stars </div>
          <ProgressBar completed={this.state.four / this.total() * 100} />
          <div> {this.state.four} </div>
        </div>

        <div className="reviewLabel">
          <div> 3 stars </div>
          <ProgressBar completed={this.state.three / this.total() * 100} />
          <div> {this.state.three} </div>
        </div>

        <div className="reviewLabel">
          <div> 2 stars </div>
          <ProgressBar completed={this.state.two / this.total() * 100} />
          <div> {this.state.two} </div>
        </div>

        <div className="reviewLabel" style={{ "margin-bottom": "30px" }}>
          <div> 1 stars </div>
          <ProgressBar completed={this.state.one / this.total() * 100} />
          <div> {this.state.one} </div>
        </div>


        <div className="characteristics">
          {Object.keys(this.state.characteristics).length && Object.keys(this.state.characteristics).map((feature, index) => {
            return <div>
              {/* <div className="feature"> {feature}: {Number(this.state.characteristics[feature].value).toFixed(1)} </div>
              <input type="range" value={Number(this.state.characteristics[feature].value)} min="0" max="5" /> */}

              <label for="customRange3" class="form-label">{feature} : {Number(this.state.characteristics[feature].value).toFixed(1)}</label>
              <input type="range" class="form-range" min="0" max="5" value={Number(this.state.characteristics[feature].value)} id="customRange3" />

            </div>
          })}

          {/* {this.state.characteristics.Comfort &&
            <div>
              <div className="feature"> Comfort </div>
              <input type="range" value={Number(this.state.characteristics.Comfort.value)} />
            </div>
          }
          {this.state.characteristics.Comfort &&
            <div>
              <div className="feature"> Comfort </div>
              <input type="range" value={Number(this.state.characteristics.Comfort.value)} />
            </div>
          }
          {this.state.characteristics.Comfort &&
            <div>
              <div className="feature"> Comfort </div>
              <input type="range" value={Number(this.state.characteristics.Comfort.value)} />
            </div>
          }
          {this.state.characteristics.Comfort &&
            <div>
              <div className="feature"> Comfort </div>
              <input type="range" value={Number(this.state.characteristics.Comfort.value)} />
            </div>
          }
          {this.state.characteristics.Comfort &&
            <div>
              <div className="feature"> Comfort </div>
              <input type="range" value={Number(this.state.characteristics.Comfort.value)} />
            </div>
          } */}

        </div>

      </>
    )
  }
}

export default Rating;