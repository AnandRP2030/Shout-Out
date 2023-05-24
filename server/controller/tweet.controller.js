const TweetModel = require("../models/tweet.model");

createTweet = async (req, res) => {
  try {
    let { content, imageUrls, audience = "Everyone" } = req.body;
    let private = false;

    if (audience === "Private") {
      private = true;
    }

    const owner = req.user;
    console.log('client ',{ content, imageUrls, private, owner: owner.userId });

    const tweet = await TweetModel.create({
      content,
      imageUrls,
      private,
      owner: owner.userId,
    });
    console.log("twee", tweet);
    res.status(201).send({ message: "tweet Successfully added", tweet });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

module.exports = { createTweet };
