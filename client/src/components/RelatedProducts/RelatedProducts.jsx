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
            <s>{'$' + originalPrice}</s>
          </span>
        </div>
      )
    }

  }

  return (

    <section className="pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-6">
              <h3 className="mb-3">Related Products</h3>
          </div>
            <div className="col-6 text-right">
              <a className="btn btn-primary mb-3 mr-1" href="#carouselExampleIndicators2" role="button" data-slide="prev">
                  <i className="fa fa-arrow-left"></i>
              </a>
              <a className="btn btn-primary mb-3 " href="#carouselExampleIndicators2" role="button" data-slide="next">
                  <i className="fa fa-arrow-right"></i>
              </a>
            </div>
          <div className="col-12">
            <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">

                  <div className='row'>
                    {Object.values(relatedProdsData).map((prodData) =>
                      <div className="card col-md-4 mb-4" key={prodData.id} style={{width: "18rem"}} >
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

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>




    // <div className='relatedProducts'>
    //   {Object.values(relatedProdsData).map((prodData) =>
    //     <div className="card col-md-4 mb-3" key={prodData.id} style={{width: "18rem"}} >
    //       <img src={prodData.styles[0].photos[0].url} className="card-img-top" alt="..." />
    //       {/* <img src={defaultStylePic(prodData)} className="card-img-top" alt="..." /> */}
    //       <div className="card-body">
    //         <p className="card-text">{prodData.id}</p>
    //         <p className="card-text">{prodData.category}</p>
    //         <p className="card-text">{prodData.name}</p>
    //         <div className="card-text">{defaultStylePrice(prodData.styles)}</div>
    //         <p className="card-text">{reviewAvg(prodData.reviews)}</p>
    //       </div>
    //     </div>
    //   )}
    // </div>
  )
}

export default RelatedProducts;