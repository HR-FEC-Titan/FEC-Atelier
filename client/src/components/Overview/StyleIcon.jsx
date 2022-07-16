import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { StyleContext } from './Overview.jsx';


const StyleIcon = () => {

  const { styles, setStyles, styleIndex, setStyleIndex } = useContext(StyleContext);

  return <div className='styles'>
    {styles.map((s, i) => {
      return <div className="styleColumn" key={i} >

        <input
          type="radio"
          className="styleSelector"
          id={`Style${i}`}
          checked={i === styleIndex ? true : false}
          onChange={() => setStyleIndex(i)}
          hidden
        />

        <label className="" htmlFor={`Style${i}`}>
          <img
            className="styleIcon"
            src={s.photos[0].thumbnail_url}
          />
        </label>

      </div>
    })}

  </div>

}

export default StyleIcon;