import React, { useContext } from 'react';
import { ProductContext } from './Overview.jsx';

const Slogan = () => {

  const { slogan, description } = useContext(ProductContext);

  return <div className="slogan">
    { slogan }
    <div>{ description }</div>
  </div>
}


export default Slogan;