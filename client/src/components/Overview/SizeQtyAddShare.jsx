import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';

import { StyleContext } from './Overview.jsx';

const SizeQtyAddShare = () => {

  const { styles, styleIndex } = useContext(StyleContext);
  const currentStyle = styles[styleIndex];
  const options = Object.values(currentStyle.skus);

  const [option, setOption] = useState(-1);
  const [size, setSize] = useState();
  const [qty, setQty] = useState();

  // options changes with styleIndex
  useEffect(() => {
    setOption(-1);
    setSize();
    setQty();
    setShowMsg1(true);
    setShowMsg2(false);
  }, [styleIndex])


  // select an option meaning selecting a size, will activate quantity dropdown
  useEffect(() => {
    if (option >= 0) {
      setSize(options[option].size);
      setQty(options[option].quantity);
    }
  }, [option])

  // having a size will activate the qty dropdown
  // useEffect(() => {
  //   if (size) {
  //     console.log(size);
  //     setQty(1);
  //   }
  // }, [size])

  // if having size and qty => show msg 2
  useEffect(() => {
    if (size && qty) {
      setShowMsg1(false);
      setShowMsg2(true);
    }
  }, [size, qty])


  const [showMsg1, setShowMsg1] = useState(true);
  const [showMsg2, setShowMsg2] = useState(false);

  const msg1 = [
    <div className="alert alert-warning">
      <strong>Please select a size first!</strong>
    </div>
  ];

  const msg2 = [
    <div className="alert alert-success">
      <strong>Added to Cart!</strong>
    </div>
  ]

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
            id="size"
            style={{ width: "55%" }}
            onChange={(e) => {
              if (e.target.value >= 0) {
                setOption(e.target.value);
              }
            }}
            value={option}
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


          {/* ADD TO CART  onClick={handleClick}   ******************************** */}
          <Popup trigger={<Button style={{ width: "75%" }} className="btn btn-outline-dark"> ADD TO CART </Button>
          } position={"bottom left"}>

            {showMsg1 && msg1}
            {showMsg2 && msg2}
          </Popup>

          {/* SHARE  ****************************************** */}
          <Popup trigger={<Button style={{ width: "15%"}} className="btn btn-outline-dark"
          > <FontAwesomeIcon icon={faShare} /> </Button>} position="right top">
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
  cursor: pointer;
`




