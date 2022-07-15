import React from 'react';
import axios from "axios";

class Form extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      rating: 0,
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

  handleFormSubmission = (rating, recommend, char, summary, body, photos, nickname, email ) => {
    if(rating === '' || recommend === '' || body.length === '' || nickname === '' || email === '') return
    // let ingredientsArray = ingredients.split(",")
    // let stepsArray = steps.split(".")
    let newReview = {product_id: this.props.id,
                    rating: Number(rating),
                    summary: summary,
                    body: body,
                    recommend: "true" ? true : false,
                    name: nickname,
                    email: email,
                    photos: [photos], // converted photo to array as required by API
                    characteristics: {"223576": 1}
                  };

    console.log(newReview)
    axios.post('/reviews', newReview)
      .then((res) => {
        console.log(res);
        this.setState({
          rating: 0,
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


  render(){
    return(
      <section>

      <header>
        <h2>✏️ New Review</h2>
      </header>

      <form  >
        <label>Rating:
          <input
            type="number"
            name="rating"
            placeholder="1-5"
            required=''
            autoComplete="off"
            value= {this.state.rating}
            onChange = {this.handleChange}
          />
        </label><br>
        </br>

        <label>Do you Recommemend this product?:
          <input
            type="radio"
            name="recommend" // changed to same name
            id="yrecommend"
            onChange = {() => {this.setState({recommend: true})}} //directly updating state here
            />
          <label htmlFor="yrecommend">Yes</label>
            <input
            type="radio"
            name="recommend" // changed to same name
            id="nrecommend"
            onChange = {() => {this.setState({recommend: false})}} //directly updating state here
          />
          <label htmlFor="nrecommend">No</label><br></br>
        </label><br></br>


        <label>Characteristics Rating:
          <input
            type="text"
            name="char"
            placeholder="this is the char rating"
            required=""
            autoComplete="off"
            value={this.state.char}
            onChange = {this.handleChange}
          />
        </label><br></br>

        <label>summary:
          <input
            type= "text"
            name="summary"
            placeholder="Example: Best Purchase ever!"
            required=""
            autoComplete="off"
            value={this.state.summary}
            onChange = {this.handleChange}
          />
        </label><br></br>

        <label>Body:
          <textarea
            cols="48"
            rows="8"
            name="body"
            placeholder="Why did you like the product or not?"
            required=""
            autoComplete="off"
            value={this.state.body}
            onChange = {this.handleChange}
          ></textarea>
        </label><br></br>

        <label>Photos:
          <input
            type="text"
            name="photos"
            placeholder="this is where you put your photos"
            required=""
            autoComplete="off"
            // value={this.state.photos}
            onChange = {this.handleChange}
          />
        </label><br></br>

        <label>Nickname:
          <input
            type="text"
            name="nickname"
            placeholder="Example: jackson11!"
            required=""
            autoComplete="off"
            value={this.state.nickname}
            onChange = {this.handleChange}
          />
          <i>(For privacy reasons, do not use your full name or email address)</i>
        </label><br></br>

        <label>Email:
          <input
            type="text"
            name="email"
            placeholder="Example: jackson11@email.com"
            required=""
            autoComplete="off"
            value={this.state.email}
            onChange = {this.handleChange}
          />
           <i>(For authentication reasons, you will not be emailed)</i>
        </label><br></br>


        <input onClick = {this.handleSubmit} type="submit" value="Submit Review" />

        <hr />
      </form>
    </section>

    )
  }
}

export default Form;