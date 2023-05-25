const { createTweet , getTweets} = require('../controller/tweet.controller');
const {findOwner}  = require('../middlewares/tweet.middleware')
const tweetRouter = require('express').Router();


tweetRouter.get('/', getTweets);
tweetRouter.post('/create', createTweet)
module.exports = {tweetRouter}