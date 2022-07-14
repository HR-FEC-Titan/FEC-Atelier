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
            value= {this.state.name}
            onChange = {this.handleChange}
          />
        </label>

        <label>Summary:
          <input
            type="text"
            name="summary"
            placeholder="this is the summary"
            required=""
            autoComplete="off"
            value={this.state.image_id}
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

        <label>Steps: <i>(one per line)</i>
          <textarea
            cols="48"
            rows="8"
            name="steps"
            placeholder="In the bowl of your stand mixer, stir together the flours, salt, sugar, and yeast.
    Add the water, milk, and egg, but not the butter."
            required=""
            autoComplete="off"
            value={this.state.steps}
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