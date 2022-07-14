import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import RelatedProdsCarousel from './RelatedProdsCarousel.jsx';

var RelatedProducts = ({ id }) => {
  // const [relatedIDs, setRelatedIDs] = useState([]); //may not be necessary
  const [relatedProdsData, setRelatedProdsData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(Object.values(relatedProdsData).length);

  useEffect(() => {
    axios.get('/products/' + id + '/related')
      .then(res => {
        // setRelatedIDs(res.data); //may not be necessary
        res.data.forEach((relatedProdID) => {
          axios.get('/products/' + relatedProdID)
            .then(resData => {
              axios.get('/products/' + relatedProdID + '/styles')
                .then(resStyle => {
                  axios.get('/reviews/?product_id=' + relatedProdID)
                    .then(resReview => {
                      var relatedData = resData.data;
                      relatedData['styles'] = resStyle.data.results;
                      relatedData['reviews'] = resReview.data;

                      if (relatedProdID !== id) {
                        var newEntry = {};
                        newEntry[relatedProdID] = relatedData;
                        setRelatedProdsData(old => ({ ...old, ...newEntry }));
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    })
                })
                .catch(err => {
                  console.log(err);
                })
            })
            .catch(err => {
              console.log(err);
            })
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  var reviewAvg = (reviewData) => {
    var reviews = reviewData.results;
    var reviewsCount = reviews.length;
    var totalScore = 0;

    reviews.forEach((review) => {
      totalScore += review.rating;
    });

    var reviewAverage = totalScore / reviewsCount;
    var convertedAverage = (Math.round(reviewAverage * 4) / 4).toFixed(2);

    return convertedAverage;
  }

  var defaultStylePrice = (styleData) => {
    var originalPrice = '';
    var salePrice = '';

    if ((styleData.find(element => element['default?'] === true) !== undefined)) {
      originalPrice = styleData.find(element => element['default?'] === true).original_price;
      salePrice = styleData.find(element => element['default?'] === true).sale_price;
    } else {
      //if no default style
      originalPrice = styleData[0].original_price;
      salePrice = styleData[0].sale_price;
    }

    if (salePrice === null) {
      return (
        <><span>{ '$' + originalPrice }</span></>
      )
    } else {
      return (
        <>
          <span style={{ color: "red" }} >
            { '$' + salePrice + ' ' }
          </span>
          <span>
            <s>{ '$' + originalPrice }</s>
          </span>
        </>
      )
    }
  }



  useEffect(() => {
    setLength(Object.values(relatedProdsData).length)
  }, [Object.values(relatedProdsData)])


  return (
    <div className='relatedProducts' style={{ width: "970px", height: "480px" }} >
      <RelatedProdsCarousel show={4} currentIndex={currentIndex} length={length} setCurrentIndex={setCurrentIndex} setLength={setLength} >
        {Object.values(relatedProdsData).map((prodData) =>
          <div key={ prodData.id } style={{ height: '100%' }}>
            <Card style={{ width: "225px", height: "480px" }} >
              <Card.Img style={{ width: "225px", height: "240px", "objectFit": "cover" }} src={ prodData.styles[0].photos[0].url } alt="..." />
              {/* <img src={defaultStylePic(prodData)} className="card-img-top" alt="..." /> */}
              <Card.Body style={{ width: "225px", height: "240px", "objectFit": "cover" }} >
                <Card.Title style={{ "font-size": "15px" }}>{ prodData.category }</Card.Title>
                <Card.Title>{ prodData.name }</Card.Title>
                <Card.Text style={{ position: "absolute", bottom: 50 }} >{ defaultStylePrice(prodData.styles) }</Card.Text>
                <label className="rating-label" style={{ position: "absolute", bottom: 0 }}>
                  <input className="rating" max="5" readOnly step="0.25" style={{"--fill": "black", "--starsize": "2rem", "--value": reviewAvg(prodData.reviews)}} type="range" value={reviewAvg(prodData.reviews)} />
                </label>
              </Card.Body>
            </Card>
          </div>
        )}
      </RelatedProdsCarousel>
    </div>


    // <Carousel interval={null}>
    //     {Object.values(relatedProdsData).map((prodData) =>
    //       <Carousel.Item key={ prodData.id } >
    //         <Card style={{ width: '18rem' }} >
    //           <Card.Img style={{ width: '100%', height: "15vw", "object-fit": "cover" }} src={ prodData.styles[0].photos[0].url } alt="..." />
    //           {/* <img src={defaultStylePic(prodData)} className="card-img-top" alt="..." /> */}
    //           <Card.Body>
    //             {/* <Card.Text>{ prodData.id }</Card.Text> */}
    //             <Card.Title>{ prodData.category }</Card.Title>
    //             <Card.Title>{ prodData.name }</Card.Title>
    //             <Card.Text>{ defaultStylePrice(prodData.styles) }</Card.Text>
    //             {/* <Card.Text>{ reviewAvg(prodData.reviews) }</Card.Text> */}
    //             <label className="rating-label">
    //               <input className="rating" max="5" readOnly step="0.25" style={{"--fill": "black", "--starsize": "2rem", "--value": reviewAvg(prodData.reviews)}} type="range" value={reviewAvg(prodData.reviews)} />
    //             </label>
    //           </Card.Body>
    //         </Card>
    //       </Carousel.Item>
    //     )}
    // </Carousel>
  );
}

export default RelatedProducts;