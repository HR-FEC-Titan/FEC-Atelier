import React from 'react';
import { createRoot } from "react-dom/client";
import Overview from './components/Overview/Overview.jsx';
import RelatedProducts from './components/RelatedProducts/RelatedProducts.jsx';
import Reviews from './components/Reviews/Reviews.jsx';


const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = (props) => {
  return <>
    <Overview id={props.id} />
    <RelatedProducts id={props.id} />
    <Reviews id={props.id} />
  </>

}

root.render(<App id={66645} />);

export default App;