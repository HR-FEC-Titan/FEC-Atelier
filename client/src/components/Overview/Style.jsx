import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { ProductIDContext } from './Overview.jsx';

// import { StyleContext } from './Overview.jsx';
import Price from './Price.jsx';
import SizeQtyAddShare from './SizeQtyAddShare.jsx';
import Image from './Image.jsx';
import styleData from './data.json';

// export const StyleIndexContext = createContext(); // default to first style
// export const StylesContext = createContext();

export const CurrentStyleContext = createContext();
let Style = () => {
  const id = useContext(ProductIDContext);
  const [styles, setStyles] = useState(styleData.results);

  useEffect(() => {
    axios.get(`/products/${id}/styles`)
      .then(res => {
        setStyles(res.data.results);
      })
  }, [])

  const defaultIndex = styles.reduce((memo, style, index) => {
    if (style.default === true) {
      memo = index;
    }
    return memo;
  }, 0)

  const [styleIndex, setStyleIndex] = useState(defaultIndex);
  const [currentStyle, setCurrentStyle] = useState(styles[styleIndex]);

  useEffect(() => {
    setCurrentStyle(styles[styleIndex])
  }, [styles, styleIndex]);

  return (

    <React.Fragment>
      <CurrentStyleContext.Provider value={currentStyle}>


      {/* <StylesContext.Provider value={styles}>
      <StyleIndexContext.Provider value={styleIndex}> */}
        <Price />
        <SizeQtyAddShare />
        <Image />
      {/* </StyleIndexContext.Provider>
      </StylesContext.Provider> */}

      </CurrentStyleContext.Provider>

      <div className='styles'>
        {styles.map((s, i) => {
          return <div className="styleColumn" key={i} >

            <input
              type="radio"
              name="StyleSelector"
              id={`Style${i}`}
              checked={i === styleIndex ? true : false}
              onChange={() => setStyleIndex(i)}
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

    </React.Fragment>

  )
}


export default Style;


{/* <div class="categories-wrapper">
  <img src='https://66.media.tumblr.com/4f3cbb1b66a76a19a9794a162373abc5/tumblr_inline_n258pbAEBc1qhwjx8.png' alt='Random image' />
  <input class='category-input' type="checkbox" id='checker' name="categories[]" value="" />
  <label for="checker"></label>
  <input type="hidden" name="categoryFiles[]" value="" />
</div> */}