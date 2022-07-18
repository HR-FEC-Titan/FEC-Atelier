import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';

import { StyleContext } from './Overview.jsx';

const SizeQtyAddShare = () => {

  const { currentStyle } = useContext(StyleContext);
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

  if (options.length === 1 && options[0].size === null) {
    return (
      <div className="sizeQtyAddShare">
        <Div className="size">OUT OF STOCK</Div>
        <Popup trigger={<Button style={{ width: "25%", opacity: "0.7" }}> <FontAwesomeIcon icon={faShare} /> </Button>} position="right top">
          <a href="http://www.facebook.com"> <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="http://www.twitter.com"> <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="http://www.pinterest.com"> <FontAwesomeIcon icon={faPinterest} />
          </a>
        </Popup>
      </div>
    )
  } else {


    return (
      <React.Fragment>
        <div className="sizeQtyAddShare">

          {/* SIZE dropdown: if no option, show OOS; else show dropdown ******************************* */}
          <Select
            style={{ width: "55%" }}
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
          </Select>

          {/* QTY dropdown    ******************************** */}
          {!qty ?
            (<Select style={{ width: "35%" }} disabled={true}><option> - QTY</option>
            </Select>)
            :
            (<Select style={{ width: "35%" }}>
              {Array(Math.min(qty, 15)).fill(1).map((e, index) => {
                return <option key={index}>{index + 1}</option>
              })}
            </Select>)
          }


          {/* ADD TO CART     ******************************** */}
          <Button onClick={handleClick} style={{ width: "75%" }}> ADD TO CART </Button>



          {/* SHARE  ****************************************** */}
          <Popup trigger={<Button style={{ width: "15%", opacity: "0.7" }}> <FontAwesomeIcon icon={faShare} /> </Button>} position="right top">
            <a href="http://www.facebook.com"> <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="http://www.twitter.com"> <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="http://www.pinterest.com"> <FontAwesomeIcon icon={faPinterest} />
            </a>
          </Popup>
        </div>
      </React.Fragment>
    )
  }
}


export default SizeQtyAddShare;


const Button = styled.button`
  border: solid black 1px;
  background: white;
  font-size: 13px;
  border-radius: 0.25rem;
  height: 45px;
`
const Div = styled.div`
  font-size: 15px;
  width: 65%;
`

const Select = styled.select`
  height: 45px;
  border-radius: 0.25rem;
  font-size: 13px;
`




