import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { StyleContext } from './Overview.jsx';
import Price from './Price.jsx';
import SizeAndQuantity from './SizeAndQuantity.jsx';

export const IndexContext = createContext(0); // default to first style

let Style = () => {
  const styles = useContext(StyleContext);
  // console.log(styles);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <IndexContext.Provider value={index}>
        <Price />
      </IndexContext.Provider>

      <div className='styles'>
        {styles.map((s, i) => {
          return <div className="styleColumn" key={i} >

            <input
              type="radio"
              name="StyleSelector"
              id={`Style${i}`}
              checked={i === index ? true : false}
              onChange={() => setIndex(i)}
            />

            <label className="" htmlFor={`Style${i}`}>
              <img
                className="styleIcon"
                src={s.photos[0].thumbnail_url}
                width="40px"
                height="40px"
              />
            </label>

          </div>
        })}

      </div>

      <IndexContext.Provider value={index}>
        <SizeAndQuantity />
      </IndexContext.Provider>
    </div>
  )
}

export default Style;


{/* <div class="categories-wrapper">
  <img src='https://66.media.tumblr.com/4f3cbb1b66a76a19a9794a162373abc5/tumblr_inline_n258pbAEBc1qhwjx8.png' alt='Random image' />
  <input class='category-input' type="checkbox" id='checker' name="categories[]" value="" />
  <label for="checker"></label>
  <input type="hidden" name="categoryFiles[]" value="" />
</div> */}