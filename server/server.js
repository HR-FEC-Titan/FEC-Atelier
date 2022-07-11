const path = require("path");
const express = require("express"); // npm installed
const axios = require('axios');
const morgan = require('morgan');
const { getProductInfo } = require('./helper');


const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get('/products', (req, res))

app.get('/*', (req, res) => {
  getProductInfo(req.url, req.params)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log('fetching error***********');
    })
})

// POST


// PUT




app.listen(3000, () => {
  console.log('Listening on 3000!');
});
