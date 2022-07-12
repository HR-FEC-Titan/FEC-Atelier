import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { IndexContext } from './Style.jsx';
import { StyleContext } from './Overview.jsx';

const SizeAndQuantity = () => {
  const index = useContext(IndexContext);
  const styles = useContext(StyleContext);
  const options = Object.values(styles[index].skus);

  const [option, setOption] = useState({});
  const [size, setSize] = useState();
  const [qtn, setQtn] = useState();

  useEffect(() => {
    setSize(option.size);
    setQtn(option.quantity);
  }, [option])

  return <div className="sizeQtnAddShare">

    <select
      className="size"
      onChange={(e) => {
        setOption(options[e.target.value]);
      }}
    >
      <option>SELECT SIZE</option>
      {options.map((s, index) => {
        return <option key={index} value={index}>{s.size}</option>
      })}
    </select>


    <div>Quantity in Stock: {qtn}</div>


    { !qtn?
      (<select className="qtn" disabled={true}><option>-</option>
      </select>)
      :
      (<select className="qtn">
        {Array(Math.min(qtn, 15)).fill(1).map((e, index) => {
          return <option>{index + 1}</option>
        })}
      </select>)
    }

  </div>

}


export default SizeAndQuantity;
