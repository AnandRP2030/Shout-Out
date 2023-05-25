const TweetModel = require("../models/tweet.model");
const RegistrationModel = require("../models/user.model");
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
  for (const owner of ownersData){
    let modifiedData = {...owner[0]};
    delete modifiedData.password;
    modifiedOwners.push(modifiedData);
  }

  return modifiedOwners;
};

module.exports = { createTweet, getTweets };
