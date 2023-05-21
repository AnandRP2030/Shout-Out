const mongoose = require("mongoose");
const { Schema } = mongoose;
const tweetSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  imageUrls: String,
  likes: { type: Number, required: true, default: 0},
  comments: [{ body: { type: String, required: true }, date: Date }],
  retweets: {type: Number, default: 0},
  views: {type: Number,  default: 1},
  private: {type: Boolean, default: false}
},{
    timestaps: true,
    collection: tweetsCollections
});

const TweetModel = mongoose.model('TweetModel',tweetSchema);
module.exports = TweetModel;