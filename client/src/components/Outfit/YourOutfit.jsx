import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

import YourOutfitCarousel from './YourOutfitCarousel.jsx';
// import ComparisonTable from './ComparisonTable.jsx';

var YourOutfit = ({ id }) => {
  const [YourOutfitData, setYourOutfitData] = useState({});
  const [mainProdData, setMainProdData] = useState({})
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [outfitListLength, setOutfitListLength] = useState(Object.values(YourOutfitData).length);


  useEffect(() => {
    setOutfitListLength(Object.values(YourOutfitData).length)
  }, [Object.values(YourOutfitData)])


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


  return (
    <div className="yourOutfit" >
      <h3>Your Outfit</h3>
      <div style={{ width: "970px", height: "420px" }} >

        <YourOutfitCarousel show={4} currentOutfitIndex={currentOutfitIndex} outfitListLength={outfitListLength} setCurrentOutfitIndex={setCurrentOutfitIndex} setOutfitListLength={setOutfitListLength} >

            <div key={ 'outfit-0' } style={{ height: '100%' }}>
              <Card style={{ width: "225px", height: "420px" }} >
                {/* <i className="bi bi-star-fill" style={{ color: "orange", fontSize: "25px", position: "absolute", top: 0, right: 0, paddingRight: "12.5px" }} onClick={() => {console.log('this was clicked - supposed to delete')}} /> */}

                {/* <Card.Img style={{ width: "225px", height: "210px", "objectFit": "cover" }} src={ "" } alt="..." /> */}
                <div style={{ justifyContent: "center", alignItems: "center" }} >
                  <Card.Title style={{ textAlign: "center" }} >Add to Outfit</Card.Title>
                  <i className="bi bi-plus-circle" style={{ fontSize: "50px" }} />
                </div>
              </Card>
            </div>

        </YourOutfitCarousel>
      </div>

      <br/>
    </div>
  );
}

export default YourOutfit;