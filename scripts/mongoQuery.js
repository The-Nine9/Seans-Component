const mongoose = require('mongoose');
const { connect } = require('../mongoDB/mongo');
const { Listings, Users, Neighborhoods} = require('../mongoDB/schema');

connect();

const query = async () => {
  const start = process.hrtime();
  const listing = await Listings
    .findOne({_id: '5fcf08e5116b56d0608d3dda'})
    .populate({path: 'neighborhood', populate: {path: 'reviews.user'}});
  const end = process.hrtime(start);
  console.log(JSON.stringify(listing, null, 2));
  console.log(`Exectution took ${end[0]}s ${end[1] / 1000000}ms`);
};

query();