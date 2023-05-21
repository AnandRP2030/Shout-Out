const tweetRouter = require('express').Router();
tweetRouter.get('/', (req, res) => {
    console.log('req user data', req.user);
    res.send('tweet router get working');
})
module.exports = {tweetRouter}