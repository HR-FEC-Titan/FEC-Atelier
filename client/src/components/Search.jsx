import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';



const Search = ({ setId }) => {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  return (
    <div className='searchBar'>
      <nav className="navbar navbar-light bg-light" >
        <a className="navbar-brand"> WALL·E </a>
        <form
          className="form-inline"
          onSubmit={() => {
            event.preventDefault();
            setId(term);
            setTerm("");
          }}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} value={term} />
          <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div>
          <i className="bi bi-heart"style={{ fontSize: "23px" }}></i>
          <i className="bi bi-cart" style={{ fontSize: "25px", marginLeft: "15px" }}></i>
        </div>
      </nav>
    </div>
  )
}



export default Search;

const Form = styled.form`
  align-self:

`