const TweetModel = require("../models/tweet.model");

createTweet = async (req, res) => {
  try {
    let { content } = req.body;
    
    const owner = req.user;
    const tweet = await TweetModel.create({ content, owner });
    res.status(201).send({ message: "tweet Successfully added", tweet });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

module.exports = { createTweet };
