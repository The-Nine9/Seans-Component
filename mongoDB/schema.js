const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingsSchema = new Schema({
  neighborhoodId: String
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

listingsSchema.virtual('neighborhood', {
  ref: 'neighborhoods',
  localField: 'neighborhoodId',
  foreignField: '_id',
  justOne: true
});

const Listings = mongoose.model('listings', listingsSchema);

const Users = mongoose.model('users', new Schema({
  _id: String,
  name: String,
  userType: String,
  dogOwner: Boolean,
  parent: Boolean
}));

const reviewsSchema = new Schema({
  userId: String,
  reviewDate: String,
  fullText: String,
  likes: Number,
  community: Boolean,
  commute: Boolean
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

reviewsSchema.virtual('user', {
  ref: 'users',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

const Neighborhoods = mongoose.model('neighborhoods', new Schema({
  _id: String,
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