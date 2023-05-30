const TweetModel = require("../models/tweet.model.js");
const RegistrationModel = require("../models/user.model.js");
const mongoose = require('mongoose');
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

//delete
deleteTweet = async (req, res) => {
  try {
    
    const tweetId = req.params.tweetId;
    let validTweetId = mongoose.isValidObjectId(tweetId);
    console.log(validTweetId, 'valide')
    let deletingTweet;
    if (validTweetId) {

      deletingTweet = await TweetModel.find({ _id: tweetId });
      if (!deletingTweet || deletingTweet.length === 0) {
        return res.status(404).send({ error: "Tweet not found" });
      }
    } else {
      return res.status(404).send({ error: "Invalid tweet Id" });
    }

    console.log(deletingTweet, "idd");
    const requestedUserId = req.user.userId;

    const tweetOwnerId = deletingTweet[0].owner.toString();
    if (tweetOwnerId === requestedUserId) {
      const deletedTweet = await TweetModel.deleteOne({ _id: tweetId });
      console.log("delted tweet", deletedTweet);
      res
        .status(204)
        .send({ message: "Tweet Successfully Deleted", tweet: deletedTweet });
    } else {
      res
        .status(403)
        .send({ error: "You don't have the persmission to delete the tweet" });
    }
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

module.exports = { createTweet, getTweets, deleteTweet };
