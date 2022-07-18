import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { StyleContext } from './Overview.jsx';


const ExpandedAndMore = ({ url }) => {

  const { changeView } = useContext(StyleContext);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  return <Img src={url} onClick={() => changeView('zoomedIn')} />
};

export default ExpandedAndMore;

const Img = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  align-self: center;
  cursor: cell;
`;




// <Target src={url} offset={offset} />

// const Container = styled.div`
//   position: relative;
//   overflow: hidden;
//   display: block;
//   border: 1px solid black;
// `;

// const Image = styled.img.attrs((props) => ({
//   src: props.src
// }))`
//   width: 100%;
//   max-height: 100%;
//   object-fit: cover;
//   align-self: center;
//   cursor: cell;
// `;

// const Target = styled(Image)`
//   position: absolute;
//   width: 2000px;
//   left: ${ props => props.offset.left }px;
//   top: ${ props => props.offset.top }px;
//   opacity: ${ props => props.opacity };
// `