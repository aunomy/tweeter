"use strict";

// Defines helper functions for saving/getting tweets
module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, callback);
    },
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    }
  };
}
