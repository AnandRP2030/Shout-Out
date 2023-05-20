const express = require("express");
const userRouter = express.Router();
const {registerUser} = require("../controller/user.controller");
const {loginUser} = require("../controller/user.controller");


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/", (req, res) => {
  res.send("http://localhost:5000/user is working");
});

userRouter.get("/userDetails/:email/:token", async (req, res) => {
  try {
    const email = req.params.email;
    const token = req.params.token;

    if (token && email) {
      const user = jwt.decode(token);
      if (!user) {
        res.status(400).send({
          message: "user unavailable",
        });
      } else {
        let userProfileData = await RegistrationModel.find({
          email,
        });

        if (userProfileData.length != 0) {
          return res.status(200).send(userProfileData);
        } else {
          return res.status(400).send({ message: "can't find the user" });
        }
      }
    } else {
      return res.status(404).send({ message: "Token and email is required" });
    }
  } catch (error) {
    console.error('error on /userDetails router', error);
    return res.status(500).send({error: error});
  }
});

module.exports = userRouter;
