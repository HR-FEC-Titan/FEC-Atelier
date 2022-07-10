require("dotenv").config();
const axios = require('axios');

const getProductByID = (id) => {
  var config = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products/${id}`,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };

  return axios(config);
}


module.exports = {
  getProductByID
}