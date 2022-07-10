import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { StyleContext } from './Overview.jsx';


let Style = () => {
  const style = useContext(StyleContext);

  return <div>
    {style.map(s => {
      <img href={s.photos.thumbnail_url}></img>
    })}
  </div>
}

export default Style;