const express = require('express');
const app = express();
const PORT = 3000;


app.listen(PORT, () => {
  console.log('Yelp Camp is listening on port', PORT);
});
