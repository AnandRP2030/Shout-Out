const express = require("express");
const userRouter = express.Router();
const RegistrationModel = require("../../models/userSchema");

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await RegistrationModel.create({
      username,
      email,
      password,
    });
    res.status(200).send(newUser);
  } catch (err) {
    if (err) {
      console.log("err on register", err);
      res.status(400).send({ error: "Email already use" });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
    
  let userData = await RegistrationModel.find({
    email,
    password,
  });

  if (userData.length != 0) {
    return res.status(200).send(userData);
  } else {
   return res.status(400).send({error: "email or password is wrong"})
  }
});

module.exports = userRouter;
