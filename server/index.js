require('newrelic');

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const controller = require('./controllers.js');
const port = 4000;

// const db = require('../db/connection.js');

const publicDir = path.join(__dirname, '../client/public');

// app.use(bodyParser.json());
app.use('/reviews/:id', express.static(publicDir));

// app.get('*/:id/neighborhood_stats', controller.getAllStats);

// app.get('*/:id/neighborhood_reviews', controller.getAllReviews);

app.get('/api/listing/:id/neighborhood', controller.getNeighborhoodData);

// app.post('/api/listing/:id/neighborhood/review',controller.postReview);

// app.delete('/api/listing/:id/neighborhood/review', controller.deleteReview);

// app.put('/api/listing/:id/neighborhood/review', controller.alterReview);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});