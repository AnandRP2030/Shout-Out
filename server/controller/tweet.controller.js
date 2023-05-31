const TweetModel = require("../models/tweet.model.js");
const RegistrationModel = require("../models/user.model.js");
const mongoose = require("mongoose");
createTweet = async (req, res) => {
  try {
    let { content, imageUrls, audience = "Everyone" } = req.body;
    let private = false;

    if (audience === "Private") {
      private = true;
    }

    const owner = req.user;

    const tweet = await TweetModel.create({
      content,
      imageUrls,
      private,
      owner: owner.userId,
    });
    res.status(201).send({ message: "tweet Successfully added", tweet });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

getTweets = async (req, res) => {
  try {
    let tweets = await TweetModel.find({});

    let ownersInfo = await findOwner(tweets);

    // console.log(tweets)
    return res.status(200).send({ message: "All Tweets", tweets, ownersInfo });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

const findOwner = async (tweets) => {
  let ownersData = await Promise.all(
    tweets.map(async (tweet, idx) => {
      const tweetOwner = await RegistrationModel.find({ _id: tweet.owner });
      return tweetOwner;
    })
  );

  let modifiedOwners = [];
  for (const owner of ownersData) {
    let modifiedData = { ...owner[0] };
    delete modifiedData.password;
    modifiedOwners.push(modifiedData);
  }

  return modifiedOwners;
};

const findTweet = async (tweetId) => {
  let validTweetId = mongoose.isValidObjectId(tweetId);
  if (validTweetId) {
    let tweet = await TweetModel.findById(tweetId);
    if (!tweet) {
      return res.status(404).send({ error: "Tweet not found" });
    } else {
      return tweet;
    }
  } else {
    return res.status(404).send({ error: "Invalid tweet Id" });
  }
};

deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    let deletingTweet = await findTweet(tweetId);

    const requestedUserId = req.user.userId;

    const tweetOwnerId = deletingTweet.owner.toString();
    if (tweetOwnerId === requestedUserId) {
      const deletedTweet = await TweetModel.deleteOne({ _id: tweetId });
      return res.status(204).json({ message: "Tweet Successfully Deleted" });
    }
    res
      .status(403)
      .send({ error: "You don't have the persmission to delete the tweet" });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

editTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    let editingTweet = await findTweet(tweetId);
    const requestedUserId = req.user.userId;
    const tweetOwnerId = editingTweet.owner.toString();

    if (requestedUserId === tweetOwnerId) {
      const { likes, retweets, views, editContent } = req.body;
      let content = editContent;

      let updatedValue;
      if (likes) {
        console.log('lik')
        updatedValue = await TweetModel.findByIdAndUpdate(tweetId, { likes });
      }

      if (content) {
        console.log('con')
        updatedValue = await TweetModel.findByIdAndUpdate(tweetId, { content });
      }

      if (retweets) {
        console.log('ret')
        updatedValue = await TweetModel.findByIdAndUpdate(tweetId, {
          retweets,
        });
      }
      if (views) {
        console.log('vie')
        updatedValue = await TweetModel.findByIdAndUpdate(tweetId, { views });
      }

      res.status(200).send({message: "content successfully updated"});
    } else {
      res.status(403).send({ error: "you don't have the permission to edit" });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

module.exports = { createTweet, getTweets, deleteTweet, editTweet };
