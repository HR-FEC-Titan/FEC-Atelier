import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

var RelatedProducts = ({ id }) => {
  // const [relatedIDs, setRelatedIDs] = useState([]); //may not be necessary
  const [relatedProdsData, setRelatedProdsData] = useState({});

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

  return (
    <Carousel>
        {Object.values(relatedProdsData).map((prodData) =>
          <Carousel.Item key={ prodData.id } >
            <Card style={{ width: '18rem' }} >
              <Card.Img src={ prodData.styles[0].photos[0].url } alt="..." />
              {/* <img src={defaultStylePic(prodData)} className="card-img-top" alt="..." /> */}
              <Card.Body>
                {/* <Card.Text>{ prodData.id }</Card.Text> */}
                <Card.Title>{ prodData.category }</Card.Title>
                <Card.Title>{ prodData.name }</Card.Title>
                <Card.Text>{ defaultStylePrice(prodData.styles) }</Card.Text>
                {/* <Card.Text>{ reviewAvg(prodData.reviews) }</Card.Text> */}
                <label className="rating-label">
                  <input className="rating" max="5" readOnly step="0.25" style={{"--fill": "gold", "--value": reviewAvg(prodData.reviews)}} type="range" value={reviewAvg(prodData.reviews)} />
                </label>
              </Card.Body>
            </Card>
          </Carousel.Item>
        )}
    </Carousel>
  );
}

export default RelatedProducts;