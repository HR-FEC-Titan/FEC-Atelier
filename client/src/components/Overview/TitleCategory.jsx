import React, { useContext } from 'react';
import { ProductContext } from './Overview.jsx';

const TitleCategory = () => {
  const product = useContext(ProductContext);
  return <div>
    <div>Product Name: { product.name }</div>
    <div>Category: { product.category }</div>
    </div>
}

export default TitleCategory;