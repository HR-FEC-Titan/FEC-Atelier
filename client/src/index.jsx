import React from 'react';
import { createRoot } from "react-dom/client";
import Overview from './components/Overview/Overview.jsx';
import RelatedProducts from './components/RelatedProducts/RelatedProducts.jsx';
import Reviews from './components/Reviews/Reviews.jsx';


const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = (props) => {
  return <>
    <Overview id={66644} />
    <RelatedProducts id={props.id} />
    <Reviews id={props.id} />
  </>

}

root.render(<App id={66644} />);

export default App;