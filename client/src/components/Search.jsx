import React from 'react';
import { useState } from 'react';



const Search = ({ setId }) => {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  return <>
    <form onSubmit={() => {
      event.preventDefault();
      setId(term);
    }}>
      <input type="text" onChange={handleChange} value={term}/>
      <button> Search </button>
    </form>

  </>
}



export default Search;