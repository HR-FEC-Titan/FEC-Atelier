import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { StyleContext } from './Overview.jsx';


const TitCatSlogan = () => {

  const { id } = useContext(StyleContext);
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
  }, [id])

  return (
    <React.Fragment>

      <div className="titleAndCategory">
        <b className="category"> { product.category }</b>
        <h3 className="title"> {product.name}</h3>
      </div>

      <div className="slogan">
        <b>{product.slogan}</b>
        <div>{product.description}</div>
      </div>

      <div className="features">
        {product.features && product.features.map((feature, idx) => {
          if (feature.value) {
            return <div key={feature.feature}> &#x2713; {feature.value}</div>
          }
        })}
      </div>


    </React.Fragment>
  )
}

export default TitCatSlogan;