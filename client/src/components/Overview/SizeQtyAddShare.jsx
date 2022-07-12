import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';

import { IndexContext } from './Style.jsx';
import { StyleContext } from './Overview.jsx';

const SizeQtyAddShare = () => {

  const index = useContext(IndexContext);
  const styles = useContext(StyleContext);
  // console.log('current style *****************', styles[0])
  const options = Object.values(styles[index].skus);
  // console.log('All options available ^^^^^^^^^^^^^^', options);
  const [option, setOption] = useState({});
  // console.log('current option ################', option)
  const [size, setSize] = useState();
  const [qty, setQty] = useState();

  useEffect(() => {
    setSize(option.size);
    setQty(option.quantity);
  }, [option])

  const handleClick = () => {
    // if no size available, hidden button
    // if did not choose size, open the size dropdown, and msg: Please select size
    // Add product to user cart
  }

  return <div className="sizeQtyAddShare">

    {/* SIZE dropdown: if no option, show OOS; else show dropdown ******************************* */}
    {options.length === 0 ?
      <div>OUT OF STOCK</div> :
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
    }


    {/* QTY dropdown    ******************************** */}
    {!qty ?
      (<select className="qty" disabled={true}><option>-</option>
      </select>)
      :
      (<select className="qty">
        {Array(Math.min(qty, 15)).fill(1).map((e, index) => {
          return <option>{index + 1}</option>
        })}
      </select>)
    }


    {/* ADD TO CART     ******************************** */}
    {options.length && <button onClick={handleClick} className="cart"> ADD TO CART </button>}



    {/* SHARE: POPUP POSITION need to be CHANGED   ************************************** */}
    <Popup trigger={<button className="share"> <FontAwesomeIcon icon={faShare} /> </button>} position="top center" modal>
       <FontAwesomeIcon icon={faShare} />
      <a href="http://www.facebook.com" className=""> <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href="http://www.twitter.com" className=""> <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="http://www.pinterest.com" className=""> <FontAwesomeIcon icon={faPinterest} />
      </a>
    </Popup>



  </div>

}


export default SizeQtyAddShare;
