const TweetModel = require("../models/tweet.model");

createTweet = async (req, res) => {
  try {
    let { content, imageUrls } = req.body;
    const owner = req.user;
    console.log({ content, imageUrls, owner: owner.userId });

    const tweet = await TweetModel.create({
      content,
      imageUrls,
      owner: owner.userId,
    });
    console.log("twee", tweet);
    res.status(201).send({ message: "tweet Successfully added", tweet });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

module.exports = { createTweet };
