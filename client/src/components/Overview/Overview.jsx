import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// id in props
var Overview = ({ id }) => {

  const [product, setProduct] = useState({});

    useEffect(() => {
      axios.get(`/products/${id}`)
        .then(res => {
          const data = res.data;
          setProduct(data);
        })
    }, [])

    return <div className='overview'>
      <Star />
      <Review />
      <Category />
      <Title />
      <GeneralInfo />
      <Share />
      <Style />
    </div>

}

export default Overview;