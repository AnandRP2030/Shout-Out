const { createTweet , getTweets, deleteTweet} = require('../controller/tweet.controller');
const {findOwner}  = require('../middlewares/tweet.middleware')
const tweetRouter = require('express').Router();


tweetRouter.get('/', getTweets);
tweetRouter.post('/create', createTweet);
tweetRouter.delete('/delete/:tweetId', deleteTweet);

module.exports = {tweetRouter}