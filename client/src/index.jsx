import React from 'react';
import { useState } from 'react';
import { createRoot } from "react-dom/client";

import Search from './components/Search.jsx';
import Overview from './components/Overview/Overview.jsx';
import RelatedProducts from './components/RelatedProducts/RelatedProducts.jsx';
import Reviews from './components/Reviews/Reviews.jsx';

const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = (props) => {
  const [id, setId] = useState(props.id);

  // handleSearch = (id) => {
  //   setId(id)
  // }

  return <>
    <Search setId={setId} />
    <Overview id={id} />
    {/* <RelatedProducts id={props.id} /> */}
    {/* <Reviews id={props.id} /> */}
  </>

}

root.render(<App id={66642} />);

export default App;