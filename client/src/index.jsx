import React from 'react';
import { useState } from 'react';
import { createRoot } from "react-dom/client";
import axios from 'axios';

import Search from './components/Search.jsx';
import Overview from './components/Overview/Overview.jsx';
import RelatedProducts from './components/RelatedProducts/RelatedProducts.jsx';
import Reviews from './components/Reviews/Reviews.jsx';

const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = (props) => {
  const [id, setId] = useState(props.id);

  const postClickingEvent = (e, widgetName) => {
    const interaction = {
      element: e.target.outerHTML,
      widget: widgetName,
      time: Date.now().toString()
    }
    console.log(interaction);
    axios.post('/interactions', interaction)
      .then(() => console.log('interaction posted'))
      .catch(e => console.log('posting failure'))
  }

  return (
    <>
    <Search setId={setId} />
    <Overview id={id} postClickingEvent={postClickingEvent}/>
    <RelatedProducts id={id} setId={setId} postClickingEvent={postClickingEvent} />
    <Reviews id={id} postClickingEvent={postClickingEvent} />
  </>
  )
}

root.render(<App id={66646} />);

export default App;