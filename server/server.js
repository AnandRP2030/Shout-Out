const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/user.router.js");
const { connectDb } = require("./config/config");
const { tweetRouter } = require("./routes/tweet.router.js");
const { authenticateUser } = require("./middlewares/auth.js");
const {tweetUploadRouter} = require('./api/cloudinary_storage.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("working");
});

app.use("/user", userRouter);

app.use(authenticateUser)
app.use('/user/tweets', tweetRouter);
app.use('/upload', tweetUploadRouter);

connectDb().then(() => {
  app.listen(PORT, (err) => {
    if (err) console.log("err on listen", err);
    console.log("Server running on " + PORT);
  });
});



