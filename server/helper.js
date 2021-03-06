require("dotenv").config();
const axios = require('axios');

const getProductInfo = (url, params) => {

  var config = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc${url}`,
    params: params,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };

  return axios(config);
}

const postProductInfo = (data) => {
  var config = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews`,
    // params: params,
    data: data,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };

  return axios(config);
}

const reviewUpdate = (data) => {
  var config = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews/:review_id/helpful`,
    data: data,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };
  return axios(config);
}


const postInteraction = (data) => {
  var config = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/interactions`,
    data: data,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };

  return axios(config);
}


module.exports = {
  getProductInfo,
  postProductInfo,
  postInteraction
}