const express = require("express");
const userRouter = express.Router();
const RegistrationModel = require("../../models/userSchema");
const JWT_SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log(name, username, email, password);
  if (name && username && email && password) {
    try {
      const newUser = await RegistrationModel.create({
        name,
        username,
        email,
        password,
      });
      return res.status(200).send(newUser);
    } catch (err) {
      console.error("err on register", err);
      return res.status(500).send({ error: err });
    }
  } else {
    return res.status(400).send({ error: "All the fields are required" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let userData = await RegistrationModel.find({
      email,
      password,
    });

    if (userData.length != 0) {
      const token = jwt.sign(
        {
          email,
          password,
        },
        JWT_SECRET_KEY
      );

      return res.status(200).send({ userData, token });
    } else {
      return res.status(400).send({ error: "email or password is wrong" });
    }
  } catch (error) {
    console.error("error on login router => ", error);
    return res.status(500).send({ error: "Internal Server error" });
  }
});

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
