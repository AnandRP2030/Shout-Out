const express = require('express');
const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
    console.log(req.body);
    res.send({"message": "registration successs"});
})




module.exports = userRouter;