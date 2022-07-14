import React, { useEffect, useState } from 'react';

// const ThumbnailCarousel = (props) => {
//   const { children, show } = props

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [length, setLength] = useState(children.length)


//   // Set the length to match current children from props
//   useEffect(() => {
//     setLength(children.length)
//   }, [children])


//   const next = () => {
//     if (currentIndex < (length - show)) {
//       setCurrentIndex(prevState => prevState + 1)
//     }
//   }

//   const prev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(prevState => prevState - 1)
//     }
//   }


//   return (
//     <div className="t-carousel-container">
//       <div className="t-carousel-wrapper">

//         {
//           currentIndex > 0 &&
//           <button onClick={prev} className="t-image-up-arrow">
//             &#8963;
//           </button>
//         }


//         <div
//           className="t-carousel-content-wrapper"
//         >
//           <div
//             className={`t-carousel-content show-${show}`}
//             style={{
//               transform: `t-translateY(-${currentIndex * (100 / show)}%)`
//             }}
//           >

//             {children}

//           </div>
//         </div>


//         {
//           currentIndex < (length - show) &&
//           <button onClick={next} className="t-image-down-arrow">
//             &#8964;
//           </button>
//         }
//       </div>
//     </div>
//   )
// }

// export default ThumbnailCarousel;