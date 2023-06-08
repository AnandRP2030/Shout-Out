const {
  createTweet,
  getTweets,
  deleteTweet,
  editTweet,
  likeTweet,
  retweet,
  comment,
  getATweet,
  findUserById
} = require("../controller/tweet.controller");
const { findOwner } = require("../middlewares/tweet.middleware");
const tweetRouter = require("express").Router();

tweetRouter.get("/", getTweets);
tweetRouter.get('/:tweetId', getATweet);
tweetRouter.get('/user/:userId', findUserById)
tweetRouter.post("/create", createTweet);
tweetRouter.delete("/delete/:tweetId", deleteTweet);
tweetRouter.patch("/edit/:tweetId", editTweet);


tweetRouter.patch("/like/:tweetId", likeTweet);
tweetRouter.patch("/retweet/:tweetId", retweet);
tweetRouter.patch("/comment/:tweetId", comment);
module.exports = { tweetRouter };
