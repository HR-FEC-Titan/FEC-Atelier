const path = require("path");
const express = require("express"); // npm installed
const axios = require('axios');
const { getProductByID } = require('./helper');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get('/products/:id', (req, res) => {
  getProductByID(req.params.id)
    .then(response => {
      res.send(response.data);
    })
})

app.listen(3000, () => {
  console.log('Listening on 3000!');
});
