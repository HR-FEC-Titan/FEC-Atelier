import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
// import { ProductIDContext } from './Overview.jsx';
import { StyleContext } from './Overview.jsx';

// import { ProductContext } from './Overview.jsx';

const TitCatSlogan = () => {

  const { id } = useContext(StyleContext);
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
  }, [])

  return (
    <React.Fragment>

      <div className="titleAndCategory">
        <b className="title"> {product.category}</b>
        <h3 className="category"> {product.name}</h3>
      </div>

      <div className="slogan">
        <div>{product.slogan}</div>
        <div>{product.description}</div>
      </div>


    </React.Fragment>
  )
}

export default TitCatSlogan;