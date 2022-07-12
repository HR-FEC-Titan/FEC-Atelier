import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';
import { ProductIDContext } from './Overview.jsx';

// import { ProductContext } from './Overview.jsx';

const TitCatSlogan = () => {

  const id = useContext(ProductIDContext);
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
  }, [])

  return (
    <React.Fragment>

      <div className='titleAndCategory'>
        <b className=""> {product.category}</b>
        <h4 className=""> {product.name}</h4>
      </div>

      <div className="slogan">
        {product.slogan}
        <div>{product.description}</div>
      </div>


    </React.Fragment>
  )
}

export default TitCatSlogan;