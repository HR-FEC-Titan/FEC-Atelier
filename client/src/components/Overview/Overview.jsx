import React from 'react';
import { useState } from 'react';

var Overview = () => {

  const [id, setId] = useState(66647);


    return <div>
      <h1 onClick={() => {setId(id + 1)} }>Product Overview: { id }</h1>
    </div>

}

export default Overview;