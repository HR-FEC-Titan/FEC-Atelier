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
  console.log(data);
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


module.exports = {
  getProductInfo,
  postProductInfo
}