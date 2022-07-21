import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

import YourOutfitCarousel from './YourOutfitCarousel.jsx';
// import ComparisonTable from './ComparisonTable.jsx';

var YourOutfit = ({ mainProdData }) => {
  const [CurrentProdData, setCurrentProdData] = useState({});
  const [YourOutfitData, setYourOutfitData] = useState({});
  // const [ProdData, setProdData] = useState(mainProdData);
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const [outfitListLength, setOutfitListLength] = useState(0);


  useEffect(() => {
    setOutfitListLength(Object.values(YourOutfitData).length + 1);
  }, [YourOutfitData])


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
        <><span>{'$' + originalPrice}</span></>
      )
    } else {
      return (
        <>
          <span style={{ color: "red" }} >
            {'$' + salePrice + ' '}
          </span>
          <span>
            <s>{'$' + originalPrice}</s>
          </span>
        </>
      )
    }
  }


  var gatherData = (relatedProdFeatures) => {
    var mainProdFeatures = mainProdData.features;
    var combinedFeaturesData = mainProdFeatures.slice();

    relatedProdFeatures.forEach(prodFeature => {
      if (combinedFeaturesData.find(element => element['feature'] === prodFeature.feature)) {
        combinedFeaturesData[combinedFeaturesData.findIndex(element => element['feature'] === prodFeature.feature)]['relatedProdvalue'] = prodFeature.value;
      } else {
        combinedFeaturesData.push({ 'feature': prodFeature.feature, 'relatedProdvalue': prodFeature.value })
      }
    })
    setTableData(old => combinedFeaturesData);
  }


  var addOutfit = (data) => {
    var currentProductData = {};
    currentProductData[data.id] = data;
    setYourOutfitData(old => ({ ...old, ...currentProductData }));
  }


  var removeOutfit = (outfitID) => {
    var adjstedOutfitData = YourOutfitData;
    delete adjstedOutfitData[outfitID];
    setYourOutfitData(old => ({ ...old, ...adjstedOutfitData }));
  }


  return (
    <div className="yourOutfit" >
      <h3>Your Outfit</h3>
      <div style={{ width: "100%", height: "420px" }} >

        <YourOutfitCarousel show={4} currentOutfitIndex={currentOutfitIndex} outfitListLength={outfitListLength} setCurrentOutfitIndex={setCurrentOutfitIndex} setOutfitListLength={setOutfitListLength} >

          {Object.values(YourOutfitData).map((outfitData) => {
            return (
              <div key={'outfit-' + outfitData.id} style={{ height: '100%' }} >

                <Card style={{ margin: "0 5px", height: "100%" }} >

                  <i className="bi bi-x-square" id={outfitData.id} style={{ color: "black", fontSize: "25px", position: "absolute", top: 0, right: 0, paddingRight: "12.5px" }} onClick={() => { removeOutfit(event.target.id) }} />

                  <Card.Img id={outfitData.id} style={{ width: "100%", height: "50%", "objectFit": "cover" }} src={outfitData.styles[0].photos[0].url ? outfitData.styles[0].photos[0].url : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"} alt="..." />


                  <Card.Body style={{ width: "100%", height: "50%", "objectFit": "cover" }} >
                    <Card.Title style={{ fontSize: "15px" }}>{outfitData.category}</Card.Title>
                    <Card.Title>{outfitData.name}</Card.Title>
                    <Card.Text style={{ position: "absolute", bottom: 50 }} >{defaultStylePrice(outfitData.styles)}</Card.Text>
                    <label className="rating-label" style={{ position: "absolute", bottom: 0 }}>
                      <input className="rating" max="5" readOnly step="0.25" style={{ "--fill": "black", "--starsize": "2rem", "--value": reviewAvg(outfitData.reviews) }} type="range" value={reviewAvg(outfitData.reviews)} />
                    </label>
                  </Card.Body>
                </Card>

              </div>
            )
          })}

          {/* <div key={'outfitAdd'} style={{ height: '100%' }} >
            <Card onClick={() => { addOutfit(mainProdData) }} style={{ position: "relative", margin: "0 5px", width: "100%", height: "100%" }} >
              <div style={{ justifyContent: "center", alignItems: "center" }} >
                <Card.Title style={{ textAlign: "center", marginTop: "115px" }} >Add to Outfit</Card.Title>
                <i className="bi bi-plus-circle" style={{ fontSize: "50px", position: "absolute", right: "50%", top: "50%" }} />
              </div>
            </Card>
          </div> */}

            <Card onClick={() => { addOutfit(mainProdData) }}
              style={{ margin: "0 5px", height: "100%" }} >
              <div style={{
                height: "100%",
                display: "flex",
                "flex-direction": "column",
                "justify-content": "center",
                "align-items": "center"
                }}
              >
                <Card.Title style={{ textAlign: "center" }} >Add to Outfit</Card.Title>
                <i className="bi bi-plus-circle" style={{ fontSize: "50px" }} />
              </div>
            </Card>


        </YourOutfitCarousel>
      </div>

      <br />
    </div>
  );
}

export default YourOutfit;