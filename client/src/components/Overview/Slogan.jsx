import React, { useContext } from 'react';
import { ProductContext } from './Overview.jsx';

const Slogan = () => {

  const { slogan } = useContext(ProductContext);

  return <div className="slogan">Slogan: { slogan }</div>
}


export default Slogan;