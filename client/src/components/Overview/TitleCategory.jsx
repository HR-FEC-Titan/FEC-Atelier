import React, { useContext } from 'react';
import { ProductContext } from './Overview.jsx';

const TitleCategory = () => {
  const product = useContext(ProductContext);
  return <div className='titleAndCategory'>
    <div className="">Category: { product.category }</div>
    <div className="">Product Name: { product.name }</div>
    </div>
}

export default TitleCategory;