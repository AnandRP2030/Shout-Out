require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const userRouter = require("./routes/user.router.js");
const { connectDb } = require("./config/config");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("working");
});

connectDb().then(() => {
  app.listen(PORT, (err) => {
    if (err) console.log("err on listen", err);
    console.log("Server running on " + PORT);
  });
});
