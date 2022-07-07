import React from 'react';
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  return <h1>Changed This to Something Else</h1>
}

root.render(<App />);