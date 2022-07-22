import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

import RelatedProdsCarousel from './RelatedProdsCarousel.jsx';
import ComparisonTable from './ComparisonTable.jsx';
import YourOutfit from '../Outfit/YourOutfit.jsx';

var RelatedProducts = ({ id, setId, postClickingEvent }) => {
  const [relatedProdsData, setRelatedProdsData] = useState({});
  const [mainProdData, setMainProdData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [length, setLength] = useState(Object.values(relatedProdsData).length);
  const [comparedProdName, setComparedProdName] = useState('');

  useEffect(() => {
    setRelatedProdsData({});
    hideComparisonModal();
    setMainProdData({});
    setCurrentIndex(0);

    axios.get('/products/' + id + '/related')
      .then(res => {
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

                      if (String(relatedProdID) !== String(id)) {
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

    axios.get('/products/' + id)
      .then(resMainData => {
        axios.get('/products/' + id + '/styles')
          .then(resMainStyles => {
            axios.get('/reviews/?product_id=' + id)
              .then(resMainReview => {
                var mainData = resMainData.data;
                mainData['styles'] = resMainStyles.data.results;
                mainData['reviews'] = resMainReview.data;

                setMainProdData(old => ({ ...old, ...mainData }));
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

  }, [id]);


  useEffect(() => {
    setLength(Object.values(relatedProdsData).length)
  }, [Object.values(relatedProdsData)])


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


  var openComparisonModal = (clickedID) => {
    var popup = document.getElementById("popup");
    popup.classList.add("open-popup");
    setComparedProdName(old => relatedProdsData[clickedID].name);
    gatherData(relatedProdsData[clickedID].features);
  }


  var hideComparisonModal = () => {
    var popup = document.getElementById("popup");
    popup.classList.remove("open-popup");
  }


  var gatherData = (relatedProdFeatures) => {
    var combinedFeaturesData = [];
    mainProdData.features.forEach(feature => {
      combinedFeaturesData.push({...feature});
    });

    combinedFeaturesData.forEach(mainProdFeat => {
      if (mainProdFeat['value'] !== null) {
        mainProdFeat['mainProdValue'] = <div>&#x2713;</div>;
      }
    })

    relatedProdFeatures.forEach(prodFeature => {
      if (prodFeature['value'] !== null) {
        if (combinedFeaturesData.find(element => element['value'] === prodFeature.value)) {
          combinedFeaturesData[combinedFeaturesData.findIndex(element => element['value'] === prodFeature.value)]['relatedProdvalue'] = <div>&#x2713;</div>;
        } else {
          combinedFeaturesData.push({ 'value': prodFeature.value, 'relatedProdvalue': <div>&#x2713;</div> })
        }
      }
    })
    setTableData(old => combinedFeaturesData);
  }


  return (
    <div className="relatedProducts" onClick={e => postClickingEvent(e, 'Related Products')}>
      <h5 style={{ marginBottom: "20px" }}>RELATED PRODUCTS</h5>
      <div  >

        <RelatedProdsCarousel show={4} currentIndex={currentIndex} length={length} setCurrentIndex={setCurrentIndex} setLength={setLength} >

          {Object.values(relatedProdsData).map((prodData) =>
            <div key={ 'relatedProd-' + prodData.id } style={{ height: '100%' }}>
              <Card style={{ margin: "0 5px", height: "100%", backgroundColor : "#F8F9FA" }} >

                <i className="bi bi-star" id={ prodData.id } style={{ color: "white", fontSize: "25px", position: "absolute", top: 0, right: 0, paddingRight: "12.5px", cursor : "pointer" }} onClick={() => {openComparisonModal(event.target.id)}} />

                <Card.Img id={ prodData.id } style={{ width: "100%", height: "60%", "objectFit": "cover", cursor: "pointer" }} src={ prodData.styles[0].photos[0].url ? prodData.styles[0].photos[0].url : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" } alt="..." onClick={() => {setId(event.target.id)}} />

                <Card.Body style={{ width: "100%", height: "40%", "objectFit": "cover" }} >
                  <Card.Title style={{ fontSize: "15px" }}>{ prodData.category }</Card.Title>
                  <Card.Title style={{ fontSize: "16px", fontWeight: "700" }}>{ prodData.name }</Card.Title>
                  <Card.Text style={{ position: "absolute", bottom: "7%" }} >{ defaultStylePrice(prodData.styles) }</Card.Text>
                  <label className="rating-label" style={{ position: "absolute", bottom: 0 }}>
                    <input className="rating" max="5" readOnly step="0.25" style={{"--fill": "black", "--starsize": "1.2rem", "--value": reviewAvg(prodData.reviews), backgroundColor : "#F8F9FA"}} type="range" value={reviewAvg(prodData.reviews)} />
                  </label>
                </Card.Body>
              </Card>
            </div>
          )}
        </RelatedProdsCarousel>
      </div>

      <div className="popup" id="popup" >
        <i className="bi bi-x-square" style={{ fontSize: "25px", position: "absolute", top: 0, right: 0, paddingRight: "10px", cursor : "pointer" }} onClick={ () => { hideComparisonModal() }} ></i>
        <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >Comparing</h3>

        <ComparisonTable tableData={tableData} mainProdData={mainProdData} comparedProdName={comparedProdName} />

      </div>
      <br/>
      <br/>
      <YourOutfit mainProdData={mainProdData} />
      <br/>
    </div>
  );
}

export default RelatedProducts;