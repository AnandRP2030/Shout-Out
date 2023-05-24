require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const userRouter = require("./routes/user.router.js");
const { connectDb } = require("./config/config");
const { tweetRouter } = require("./routes/tweet.router.js");
const { authenticateUser } = require("./middlewares/auth.js");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("working");
});

app.use("/user", userRouter);

app.use(authenticateUser)
app.use('/user/tweets', tweetRouter);

connectDb().then(() => {
  app.listen(PORT, (err) => {
    if (err) console.log("err on listen", err);
    console.log("Server running on " + PORT);
  });
});