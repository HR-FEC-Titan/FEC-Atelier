const path = require("path")
const express = require("express"); // npm installed

const app = express();

app.use(express.static(path.join(__dirname, "/client/dist")));
// other configuration...

app.get('/:id', (req, res) => {
  // pass id back to react to render
})

app.listen(3000, () => {
  console.log('Listening on 3000!');
});
