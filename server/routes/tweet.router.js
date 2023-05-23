const { createTweet } = require('../controller/tweet.controller');

const tweetRouter = require('express').Router();

tweetRouter.get('/', (req, res) => {
    console.log('req user data', req.user);
    res.send('tweet router get working');
})

tweetRouter.post('/create', createTweet)
module.exports = {tweetRouter}