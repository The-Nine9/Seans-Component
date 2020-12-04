/* eslint-disable max-len */
const LorenIpsum = require('lorem-ipsum').LoremIpsum;
const faker = require('faker');
const db = require('./db/connection.js');

//************ Helper Functions ******************************************************************/

// create a neighborhoods stats generator
const neighborhoodStatsGenerator = function() {
  return {
    dog_friendly: Math.random().toFixed(2),
    grocery_stores: Math.random().toFixed(2),
    neighbors_friendly: Math.random().toFixed(2),
    parking_easy: Math.random().toFixed(2),
    yard: Math.random().toFixed(2),
    community_events: Math.random().toFixed(2),
    sidewalks: Math.random().toFixed(2),
    walk_night: Math.random().toFixed(2),
    five_years: Math.random().toFixed(2),
    kids_outside: Math.random().toFixed(2),
    car: Math.random().toFixed(2),
    restaurants: Math.random().toFixed(2),
    streets: Math.random().toFixed(2),
    holiday: Math.random().toFixed(2),
    quiet: Math.random().toFixed(2),
    wildlife: Math.random().toFixed(2),
  };
};

// generate randomDate
const randomDate = function () {
  var start = new Date(2015, 0, 1);
  var end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString('en-US');
};

// create wordGenerator function
const textGenerator = new LorenIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

//************ Generating dummy data per schema table ********************************************************/

// create array of 10 neighborhoods
const neighborhood = [
  {
    name: 'SoMA',
    stats: neighborhoodStatsGenerator(),
  },
  {
    name: 'Pacific Heights',
    stats: neighborhoodStatsGenerator(),
  },
  {
    name: 'Castro',
    stats: neighborhoodStatsGenerator(),
  },
  {
    name: 'Chinatown',
    stats: neighborhoodStatsGenerator(),
  },
  {
    name: 'Marina',
    stats: neighborhoodStatsGenerator(),
  },
  {
    name: 'Hayes Valley',
    stats: neighborhoodStatsGenerator(),
  },
  {

    name: 'Bayview',
    stats: neighborhoodStatsGenerator(),
  },
  {
    name: 'Mission',
    stats: neighborhoodStatsGenerator(),
  },
  {
    name: 'Outer Richmond',
    stats: neighborhoodStatsGenerator(),
  },
  {
    name: 'Noe Valley',
    stats: neighborhoodStatsGenerator(),
  },
];
// console.log('neighborhood array', neighborhoods);

// create 100 listings LINKING random neighboorhoods
const generateListings = function() {
  var listings = [];
  for (var i = 1; i < 101; i++) {
    var listing = {
      neighboorhood_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
    };
    listings.push(listing);
  }
  return listings;
};
// console.log('listing array', generateListings());

// create list of 50 users
const generateUsers = function() {
  var users = [];
  for (var i = 1; i < 51; i++) {
    var user = {
      name: faker.name.findName(),
      user_type: 'Resident',
      dog_owner: Math.random() < 0.5,
      parent: Math.random() < 0.5,
    };
    users.push(user);
  }
  return users;
};
// console.log('generate users', generateUsers());

// create list of reviews
const generateReviews = function(neighborhoodID, number) {
  const reviews = [];
  for (var i = 1; i < number; i++) {
    var review = {
      user_id: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
      neighborhood_id: neighborhoodID,
      review_date: randomDate(),
      full_text: textGenerator.generateParagraphs(1),
      likes: Math.floor(Math.random() * (150 - 1 + 1)) + 1,
      community: Math.random() < 0.5,
      commute: Math.random() < 0.5,
    };
    reviews.push(review);
  }
  return reviews;
};
// console.log(generateReviews(1, 10));

// All reviews for each of the ten neighborhoods
const allReviewsForTenNeighborhoods = function() {
  var allReviews = [];
  for (var i = 1; i < 11; i++) {
    var numberOfReviews = Math.floor(Math.random() * (200 - 1 + 1)) + 1;
    var reviews = generateReviews(i, numberOfReviews);
    allReviews = allReviews.concat(reviews);
  }
  return allReviews;
};

// console.log('ALL', allReviewsForTenNeighborhoods());

//*********** Queries! *********************************************************************************//

const insertOneNeighbor = function(neighborObj) {
  var queryDetails = [neighborObj.name, neighborObj.stats.dog_friendly, neighborObj.stats.grocery_stores, neighborObj.stats.neighbors_friendly, neighborObj.stats.parking_easy, neighborObj.stats.yard, neighborObj.stats.community_events, neighborObj.stats.sidewalks, neighborObj.stats.walk_night, neighborObj.stats.five_years, neighborObj.stats.kids_outside, neighborObj.stats.car, neighborObj.stats.restaurants, neighborObj.stats.streets, neighborObj.stats.holiday, neighborObj.stats.quiet, neighborObj.stats.wildlife];

  return new Promise((resolve, reject) => {
    db.connection.query('INSERT INTO neighborhoods (name, dog_friendly, grocery_stores, neighbors_friendly, parking_easy, yard, community_events, sidewalks, walk_night, five_years, kids_outside, car, restaurants, streets, holiday, quiet, wildlife) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', queryDetails, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insertOneListing = function(listingObj) {
  var queryDetails = [listingObj.neighboorhood_id];
  return new Promise((resolve, reject) => {
    db.connection.query('INSERT INTO listings (neighborhood_id) Values (?)', queryDetails, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insertOneReviewer = function(reviwerObj) {
  var queryDetails = [reviwerObj.name, reviwerObj.user_type, reviwerObj.dog_owner, reviwerObj.parent];
  return new Promise((resolve, reject) => {
    db.connection.query('INSERT INTO users (name, user_type, dog_owner, parent) Values (?, ?, ?, ?)', queryDetails, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insertOneReview = function(reviewObj) {
  var queryDetails = [reviewObj.user_id, reviewObj.neighborhood_id, reviewObj.review_date, reviewObj.full_text, reviewObj.likes, reviewObj.community, reviewObj.commute];
  return new Promise((resolve, reject) => {
    db.connection.query('INSERT INTO reviews (userid, neighborhood_id, review_date, full_text, likes, community, commute) Values (?, ?, ?, ?, ?, ?, ?)', queryDetails, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


//*********** Seeding the database *********************************************************************************//

const insertNeighborhoodPromises = neighborhood.map(neighborhood => insertOneNeighbor(neighborhood));
Promise.all(insertNeighborhoodPromises)
  .then(results => console.log('Seeding db neighboorhood success'))
  .catch(err => console.log(err));

const oneHundredListings = generateListings();
const insertListingsPromises = oneHundredListings.map(listing => insertOneListing(listing));
Promise.all(insertListingsPromises)
  .then(results => console.log('Seeding db listings success'))
  .catch(err => console.log(err));

const fiftyReviewers = generateUsers();
const insertReviwersPromises = fiftyReviewers.map(reviewer => insertOneReviewer(reviewer));
Promise.all(insertReviwersPromises)
  .then(results => console.log('Seeding db reviewers success'))
  .catch(err => console.log(err));

const allReviews = allReviewsForTenNeighborhoods();
const insertAllReviewsPromises = allReviews.map(review => insertOneReview(review));
Promise.all(insertAllReviewsPromises)
  .then(results => console.log('Seeding db reviews success'))
  .catch(err => console.log(err));
