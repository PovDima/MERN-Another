const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});


// Create user Schema & model
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is required']
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required']
  },
  age: {
    type: Number,
    required: [true, 'age is required']
  },
  geometry: GeoSchema
});
const User = mongoose.model('Users', UserSchema);

module.exports = User;