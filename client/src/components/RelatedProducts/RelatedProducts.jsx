import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import bootstrap from 'bootstrap';

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

                      var newEntry = {};
                      newEntry[relatedProdID] = relatedData;

                      setRelatedProdsData(old => ({ ...old, ...newEntry}));
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
    var originalPrice = styleData.find(element => element['default?'] === true).original_price;
    var salePrice = styleData.find(element => element['default?'] === true).sale_price;

    // console.log(originalPrice);
    console.log(salePrice);
    if (salePrice === null) {
      return (
        <div>
          <span>{'$' + originalPrice}</span>
        </div>
      )
    } else {
      return (
        <div>
          <span style={{color: "red"}} >
            {'$' + salePrice + ' '}
          </span>
          <span>
            <s>
              {'$' + originalPrice}
            </s>
          </span>
        </div>
      )
    }

  }

  return (
    <div className='relatedProducts'>
      {Object.values(relatedProdsData).map((prodData) =>
        <div className="card" key={prodData.id} style={{width: "18rem"}} >
          <img src={prodData.styles[0].photos[0].url} className="card-img-top" alt="..." />
          {/* <img src={defaultStylePic(prodData)} className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <p className="card-text">{prodData.id}</p>
            <p className="card-text">{prodData.category}</p>
            <p className="card-text">{prodData.name}</p>
            <div className="card-text">{defaultStylePrice(prodData.styles)}</div>
            <p className="card-text">{reviewAvg(prodData.reviews)}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RelatedProducts;