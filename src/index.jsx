import React from 'react';
import { createRoot } from "react-dom/client";
import Overview from './components/Overview.jsx';


const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = (props) => {
  return <>
    <Overview id={props.id} />
  </>

}

root.render(<App id={window.initialProductId} />);