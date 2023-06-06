const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema ({
  commentContent: {
    type: String,
    required: true
  }, 
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'RegistrationModel',
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
})

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
  comments: [commentSchema],
  retweets:  [{type: Schema.Types.ObjectId, ref: 'RegistrationModel'}],
  views: {type: Number,  default: 1},
  private: {type: Boolean, default: false},
},{
    timestamps: true,
    collection: "tweetsCollections"
});

const TweetModel = mongoose.model('TweetModel',tweetSchema);
module.exports = TweetModel;