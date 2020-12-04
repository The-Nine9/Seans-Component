const mongoose, { Schema } = require('mongoose');

const Listings = mongoose.model('Listings', new Schema({
  neighborhoodId: { type: Schema.Types.ObjectId, ref: 'Neighborhoods'}
}));

const Users = mongoose.model('Users', new Schema({
  name: String,
  userType: String,
  dogOwner: Boolean,
  parent: Boolean
}));

const reviewsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Users'},
  reviewDate: String,
  fullText: String,
  likes: Number,
  community: Boolean,
  commute: Boolean
});

const Neighborhoods = mongoose.model('Neighborhoods', new Schema({
  name: String,
  dogFriendly: Number,
  groceryStores: Number,
  neighborsFriendly: Number,
  parkingEasy: Number,
  yard: Number,
  communityEvents: Number,
  sidewalks: Number,
  walkNight: Number,
  fiveYears: Number,
  kidsOutside: Number,
  car: Number,
  restaurants: Number,
  streets: Number,
  holiday: Number,
  quiet: Number,
  wildlife: Number,
  reviews: [reviewsSchema]
}));

module.exports = {
  Listings,
  Users,
  reviewsSchema,
  Neighborhoods
};