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
    let tweetsStatus = findStatus(tweets, req.user.userId);
    let ownersInfo = await findOwner(tweets);
    // console.log(tweets)
    return res.status(200).send({ message: "All Tweets", tweets, ownersInfo, tweetsStatus });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

const findStatus  = (tweets, activeUserId) => {
  let statusArr = [];
  tweets.forEach(tweet => {
    let status = {
      liked: false,
      retweeted: false,
      shared: false
    }

    let isLiked = tweet.likes.findIndex((ids) => {
      return ids.toString() === activeUserId
    });
    let isRetweeted = tweet.retweets.findIndex((ids) => {
      return ids.toString() === activeUserId
    });

    if (isLiked !== -1) {
      status.liked = true;
    }
    if (isRetweeted !== -1) {
      status.retweeted = true;
    }

    statusArr.push(status);
  });
  return statusArr;
} 

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
      const { editContent } = req.body;
      let content = editContent;

      if (content) {
        await TweetModel.findByIdAndUpdate(tweetId, { content });
        return res
          .status(200)
          .send({ message: "content successfully updated" });
      }
    } else {
      res.status(403).send({ error: "you don't have the permission to edit" });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

likeTweet = async (req, res) => {
  try {
    let tweetId = req.params.tweetId;
    let tweet = await TweetModel.findById(tweetId);
    let likes = tweet.likes;
    let userId = req.user.userId.toString();
    let alreadyLiked = likes.findIndex((elem) => elem.toString() === userId);
  

    if (alreadyLiked === -1) {
      tweet.likes.push(userId);
      await tweet.save();
      return res
        .status(201)
        .json({ message: "Tweet liked", totalLikes: likes.length });
    } else {
      tweet.likes.splice(alreadyLiked, 1);
      await tweet.save();
      return res
        .status(200)
        .json({ message: "Tweet unliked", totalLikes: likes.length });
    }
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

retweet = async (req, res) => {
  try {
    let tweetId = req.params.tweetId;
    let tweet = await TweetModel.findById(tweetId);
    let retweeets = tweet.retweets;
    let userId = req.user.userId.toString();
    let alreadyTweeted = retweeets.findIndex((elem) => elem.toString() === userId); 
    if (alreadyTweeted === -1) {
      tweet.retweets.push(userId);
      await tweet.save();
      return res
        .status(201)
        .json({ message: "retweeted", totalRetweeets: retweeets.length });
    } else {
      tweet.retweets.splice(alreadyTweeted, 1);
      await tweet.save();
      console.log(tweet, "undo retweet");
      return res
        .status(200)
        .json({ message: "undo retweet", totalRetweeets: retweeets.length });
    }
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};


comment = async (req, res) => {
  try {
    let {commentContent} = req.body;

    if (!commentContent) {
      return res.status(400).json({error: 'Comment should not be empty'});
    }
    let tweetId = req.params.tweetId;
    let tweet = await TweetModel.findById(tweetId);
    let commenter = req.user.userId.toString();
    tweet.comments.push({commenter, commentContent})
    await tweet.save()
    return res.status(201).send({message: "Comment added"})    
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};


module.exports = { createTweet, getTweets, deleteTweet, editTweet, likeTweet,  retweet, comment};