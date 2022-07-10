const path = require("path");
const express = require("express"); // npm installed
const axios = require('axios');
const { getProductInfo } = require('./helper');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get('/products', (req, res))

app.get('/*', (req, res) => {
  console.log(req.url);
  getProductInfo(req.url, req.params)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log('fetching error');
    })
})

app.listen(3000, () => {
  console.log('Listening on 3000!');
});
