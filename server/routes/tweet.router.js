const { createTweet , getTweets, deleteTweet, editTweet} = require('../controller/tweet.controller');
const {findOwner}  = require('../middlewares/tweet.middleware')
const tweetRouter = require('express').Router();


tweetRouter.get('/', getTweets);
tweetRouter.post('/create', createTweet);
tweetRouter.delete('/delete/:tweetId', deleteTweet);
tweetRouter.patch('/edit/:tweetId', editTweet);
module.exports = {tweetRouter}