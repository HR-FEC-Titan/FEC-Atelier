import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';

import { CurrentStyleContext } from './Style.jsx';

const SizeQtyAddShare = () => {

  const currentStyle = useContext(CurrentStyleContext);


  const options = Object.values(currentStyle.skus);
  const [option, setOption] = useState({});
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

  return (
    <React.Fragment>
      <div className="sizeQtyAddShare">

        {/* SIZE dropdown: if no option, show OOS; else show dropdown ******************************* */}
        {options.length === 1 && options[0].size === null ?
          <div className="size">OUT OF STOCK</div> :
          <select
            className="size"
            onChange={(e) => {
              if (e.target.value >= 0) {
                setOption(options[e.target.value]);
              }
            }}
          >
            <option value={-1}> SELECT SIZE </option>
            {options.map((s, index) => {
              if (s.quantity) {
                return <option key={index} value={index}>{s.size}</option>
              }
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
              return <option key={index}>{index + 1}</option>
            })}
          </select>)
        }


        {/* ADD TO CART     ******************************** */}
        {options.length === 1 && options[0].size === null?
        <div className="cart"></div>:
        <StyledButton onClick={handleClick} className="cart"> ADD TO CART </StyledButton>}



        {/* SHARE  ****************************************** */}
        <Popup trigger={<StyledButton className="share"> <FontAwesomeIcon icon={faShare} /> </StyledButton>} position="right top">
          <a href="http://www.facebook.com" className=""> <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="http://www.twitter.com" className=""> <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="http://www.pinterest.com" className=""> <FontAwesomeIcon icon={faPinterest} />
          </a>
        </Popup>
      </div>



    </React.Fragment>
  )
}


export default SizeQtyAddShare;


const StyledButton = styled.button`
  border: solid black 1px;
  background: white;
  font-size: 15px
`
