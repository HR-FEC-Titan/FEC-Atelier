import React, { useContext } from 'react';
import { ProductContext } from './Overview.jsx';

const TitleCategory = () => {
  const product = useContext(ProductContext);
  return <div className='titleAndCategory'>
    <b className=""> { product.category }</b>
    <h4 className=""> { product.name }</h4>
    </div>
}

export default TitleCategory;