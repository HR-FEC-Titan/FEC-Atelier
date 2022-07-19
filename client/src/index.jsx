import React from 'react';
import { useState } from 'react';
import { createRoot } from "react-dom/client";

import Search from './components/Search.jsx';
import Overview from './components/Overview/Overview.jsx';
import RelatedProducts from './components/RelatedProducts/RelatedProducts.jsx';
import YourOutfit from './components/Outfit/YourOutfit.jsx';
import Reviews from './components/Reviews/Reviews.jsx';

const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = (props) => {
  const [id, setId] = useState(props.id);

  return <>
    <Search setId={setId} />
    <Overview id={id} />
    <RelatedProducts id={id} setId={setId} />
    <YourOutfit id={id} />
    <Reviews id={id} />
  </>

}

root.render(<App id={66643} />);

export default App;