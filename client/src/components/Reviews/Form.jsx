import React from 'react';
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: '',
      recommend: false,
      char: [],
      summary: '',
      body: '',
      photos: '', // changed from array to string ==> will update during typing
      nickname: '',
      email: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value //PROBLEM: if photo exists as an array, it can't be changed in this way. Doing line 13 will enable this.
    })
  }

  handleFormSubmission = (rating, recommend, char, summary, body, photos, nickname, email) => {
    if (rating === '' || recommend === '' || body.length === '' || nickname === '' || email === '') return
    let newReview = {
      product_id: this.props.id,
      rating: Number(rating),
      summary: summary,
      body: body,
      recommend: "true" ? true : false,
      name: nickname,
      email: email,
      photos: [photos], // converted photo to array as required by API
      characteristics: { "223576": 1 }
    };

    console.log(newReview)
    axios.post('/reviews', newReview)
      .then((res) => {
        console.log(res);
        this.setState({
          rating: '',
          recommend: false,  // You can delete this. As this will we want selected recommend value
          char: [],
          summary: '',
          body: '',
          photos: [],
          nickname: '',
          email: ''
        })
        // this.props.onSubmit()
      })
      .catch(err => console.log(err))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleFormSubmission(this.state.rating,
      this.state.recommend,
      this.state.char,
      this.state.summary,
      this.state.body,
      this.state.photos,
      this.state.nickname,
      this.state.email
    )
  }


  render() {
    return (
      <section >

        <header >
          <h2>✏️ New Review</h2>
        </header>

        <form className="reviewForm">
          <div className="formComponent"> Rating: &nbsp;
            <input
              type="number"
              name="rating"
              placeholder="1-5"
              required=''
              autoComplete="off"
              value={this.state.rating}
              onChange={this.handleChange}
            />
          </div>

          <div className="formComponent rec">
            Do you Recommemend this product? &nbsp;

              <input
                type="radio"
                name="recommend" // changed to same name
                id="yrecommend"
                onChange={() => { this.setState({ recommend: true }) }} //directly updating state here
              />
              <label htmlFor="yrecommend">Yes &nbsp;</label>
              <input
                type="radio"
                name="recommend" // changed to same name
                id="nrecommend"
                onChange={() => { this.setState({ recommend: false }) }} //directly updating state here
              />
              <label htmlFor="nrecommend">No</label>

          </div>


          <div className="formComponent"> Characteristics Rating: &nbsp;
            <input
              type="text"
              name="char"
              placeholder="This is the char rating"
              required=""
              autoComplete="off"
              value={this.state.char}
              onChange={this.handleChange}
            />
          </div>

          <div className="formComponent"> Summary: &nbsp;
            <input
              type="text"
              name="summary"
              placeholder="Example: Best Purchase ever!"
              required=""
              autoComplete="off"
              value={this.state.summary}
              onChange={this.handleChange}
            />
          </div>

          <div className="formComponent">
            Body: &nbsp;
            <textarea
              cols="48"
              rows="3"
              name="body"
              placeholder="Why did you like the product or not?"
              required=""
              autoComplete="off"
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="formComponent"> Photos: &nbsp;
            <input
              type="text"
              name="photos"
              placeholder="This is where you put your photos"
              required=""
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>

          <div className="formComponent"> Nickname: &nbsp;
            <input
              type="text"
              name="nickname"
              placeholder="Example: jackson11!"
              required=""
              autoComplete="off"
              value={this.state.nickname}
              onChange={this.handleChange}
            />
            <div><i><small>(For privacy reasons, do not use your full name or email address.)</small></i></div>
          </div>

          <div className="formComponent">Email: &nbsp;
            <input
              type="text"
              name="email"
              placeholder="Example: jackson11@email.com"
              required=""
              autoComplete="off"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <div><i><small>(For authentication reasons, you will not be emailed.)</small></i></div>
          </div>

          <button onClick={this.handleSubmit} type="submit" class="btn btn-outline-dark">Submit Review</button>
          {/* <input onClick={this.handleSubmit} type="submit" value="Submit Review"  className="submitReview" /> */}

        </form>
      </section>

    )
  }
}

export default Form;