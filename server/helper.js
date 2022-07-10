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


module.exports = {
  getProductInfo
}