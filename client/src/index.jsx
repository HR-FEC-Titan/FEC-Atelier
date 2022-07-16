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
<<<<<<< HEAD
    <Search setId={setId} />
    <Overview id={id} />
=======
    <Overview id={props.id} />
>>>>>>> e0808c1da1974434c25d263e1663a2caeb69ccd4
    <RelatedProducts id={props.id} />
    <Reviews id={props.id} />
  </>

}

<<<<<<< HEAD
root.render(<App id={66642} />);
=======
root.render(<App id={66645} />);
>>>>>>> e0808c1da1974434c25d263e1663a2caeb69ccd4

export default App;