const path = require("path");
const express = require("express"); // npm installed
const axios = require('axios');
const morgan = require('morgan');
const { getProductInfo, postProductInfo } = require('./helper');

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
      console.log('fetching error***********', err);
    })
})

// POST
app.post('/reviews', (req, res) => {
  const data = req.body;
  postProductInfo(data)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Posting error***********');
    })
})

// PUT




app.listen(3000, () => {
  console.log('Listening on 3000!');
});
