const faker = require('faker');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Return one user
const user = () => {
  return {
    _id: mongoose.Types.ObjectId(),
    name: faker.lorem.word() + ' ' + faker.lorem.word(),
    userType: 'Resident',
    dogOwner: Math.random() < 0.5,
    parent: Math.random() < 0.5
  }
};

// Return an array of 10,000 users
const generateUsers = () => {
  let users = [];
  for (let index = 0; index < 10000; index++) {
    users.push(user());
  }
  return users;
};

// Return one review
const reviewGenerator = (users) => {
  return {
    userId: users[Math.floor(Math.random() * 10000)]._id,
    reviewDate: faker.date.past().toJSON().slice(0, 10),
    fullText: faker.lorem.paragraph(),
    likes: Math.floor(Math.random() * 150) + 1,
    community: Math.random() < 0.5,
    commute: Math.random() < 0.5
  };
};

// Return one neighborhood
const neighborhoodGenerator = (users) => {
  const neighborhood = {
    _id: mongoose.Types.ObjectId(),
    name: faker.lorem.word(),
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
    reviews: []
  };
  for (let index = 0; index < Math.floor(Math.random() * 15); index++) {
    neighborhood.reviews.push(reviewGenerator(users));
  }
  return neighborhood;
};

// Return one listing
const listing = (neighborhoodId) => ({ neighborhoodId });

function writeNTimes(nWriter, lWriter, encoding, callback, n, users) {
  let i = n;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      const data = neighborhoodGenerator(users);
      if (i === 0) {
        nWriter.write(JSON.stringify(data), encoding);
        for (let j = 0; j < 10; j++) {
          const listingData = listing(data._id);
          if (j !== 9) {
            lWriter.write(JSON.stringify(listingData) + ',\n', encoding);
          } else {
            lWriter.write(JSON.stringify(listingData), encoding, callback);
          }
        }
      } else {
        ok = nWriter.write(JSON.stringify(data) + ',\n', encoding);
        for (let j = 0; j < 10; j++) {
          const listingData = listing(data._id);
          ok = ok && lWriter.write(JSON.stringify(listingData) + ',\n', encoding);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      nWriter.once('drain', write);
      lWriter.once('drain', write);
    }
  };
};

const usersFile = fs.createWriteStream(path.join(__dirname, '../json/users.json'));
const neighborhoodsFile = fs.createWriteStream(path.join(__dirname, '../json/neighborhoods.json'));
const listingsFile = fs.createWriteStream(path.join(__dirname, '../json/listings.json'));

const usersArray = generateUsers();
usersFile.write(JSON.stringify(usersArray, 2));
usersFile.end();

const line1 = '[\n';
neighborhoodsFile.write(line1);
listingsFile.write(line1);

writeNTimes(neighborhoodsFile, listingsFile, 'utf-8', () => {
  const lastLine = ']';
  neighborhoodsFile.write(lastLine);
  neighborhoodsFile.end();
  listingsFile.write(lastLine);
  listingsFile.end();
}, 1000000, usersArray);


// mongoimport --db SDC --collection users --file ./Documents/HackReactor/SDC/neighborhood-reviews/json/users.json --jsonArray
// mongoimport --db SDC --collection neighborhoods --file ./Documents/HackReactor/SDC/neighborhood-reviews/json/neighborhoods.json --jsonArray
// mongoimport --db SDC --collection listings --file ./Documents/HackReactor/SDC/neighborhood-reviews/json/listings.json --jsonArray