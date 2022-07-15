import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';

// import { CurrentStyleContext } from './Style.jsx';
import Default from './Carousel/Default.jsx';

const Image = () => {

  return (
    <div className="imageGallery" >
      <Default />
    </div>
  )
}

export default Image;





// import { lazy, Suspense } from "react";
// const Default = lazy(() => import('./Carousel/Default.jsx'));
// const Expanded = lazy(() => import('./Carousel/Expanded.jsx'));


  // seting up views: default, expanded, zoomedIn
  // const [view, setView] = useState({ name: 'Default', viewProps: {}});

  // const changeView = (name, someProps = {}) => {
  //   return (moreProps = {}) => {
  //     console.log('Changing view to: ' + name);
  //     setView({ name, viewProps: { ...someProps, ...moreProps }});
  //   }
  // }

  // const renderView = () => {
  //   switch (view.name) {
  //     case "Default":
  //       return <Default showExpandedView={changeView("Expanded") } show={1} url={url} thumbnailUrl={thumbnailUrl} />;
  //     case "Expanded":
  //       return <Expanded showZoomedInView={changeView("ZoomedIn")} showDefaultView={changeView("Default")} show={1} url={url} thumbnailUrl={thumbnailUrl} />;
  //     case "ZoomedIn":
  //       return <ZoomedIn showExpandedView={changeView("Default")} />
  //   }
  // }

  // return (
  //   <div className="imageGallery" >
  //     <Suspense fallback={<p>Loading....</p>}> {renderView()} </Suspense>
  //   </div>
  // )
