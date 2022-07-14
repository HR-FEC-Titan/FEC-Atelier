import React from 'react'

class Form extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      rating: 0,
      recommend: false,
      char: [],
      summary: '',
      body: '',
      photos: [],
      nickname: '',
      email: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
            type="text"
            name="rating"
            placeholder="Should be stars selector here"
            required=""
            autoComplete="off"
            value= {this.state.rating}
            onChange = {this.handleChange}
          />
        </label>
        <p>Please select your age:</p>
        <input type="radio" id="age1" name="age" value="30">
        <label for="age1">0 - 30</label><br>
        <input type="radio" id="age2" name="age" value="60">
        <label for="age2">31 - 60</label><br>

        <label>Summary:
        <input type="radio" id="age1" name="age" value="30">
        <label for="age1">0 - 30</label><br>
        <input type="radio" id="age2" name="age" value="60">
        <label for="age2">31 - 60</label><br>
        </label>
        <label>Summary:
          <input
            type="text"
            name="summary"
            placeholder="this is the summary"
            required=""
            autoComplete="off"
            value={this.state.summary}
            onChange = {this.handleChange}
          />
        </label>

        <label>summary: <i>(one per line)</i>
          <textarea
            cols="48"
            rows="8"
            name="ingredients"
            placeholder="This is the summary"
            required=""
            autoComplete="off"
            value={this.state.ingredients}
            onChange = {this.handleChange}
          ></textarea>
        </label>

        <label>Body: <i>(one per line)</i>
          <textarea
            cols="48"
            rows="8"
            name="body"
            placeholder="This is where you give your review."
            required=""
            autoComplete="off"
            value={this.state.body}
            onChange = {this.handleChange}
          ></textarea>
        </label>

        <input onClick = {this.handleSubmit} type="submit" value="Submit Review" />

        <hr />
      </form>
    </section>

    )
  }
}

export default Form;