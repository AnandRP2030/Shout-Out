const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref:'RegistrationModel',
    required: true,
  },
  imageUrls:  [String],
  videoUrls: [String],
  likes: [{type: Schema.Types.ObjectId, ref: 'RegistrationModel'}],
  comments: [{ body: { type: String }, date: Date }],
  retweets: {type: Number, default: 0},
  views: {type: Number,  default: 1},
  private: {type: Boolean, default: false}
},{
    timestamps: true,
    collection: "tweetsCollections"
});

const TweetModel = mongoose.model('TweetModel',tweetSchema);
module.exports = TweetModel;