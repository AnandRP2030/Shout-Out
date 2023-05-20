const bcrypt = require("bcrypt");
const RegistrationModel = require("../models/user.model");
const JWT_SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log(name, username, email, password);
  if (name && username && email && password) {
    const existingEmail =  await RegistrationModel.findOne({
      email
    });
    console.log('existing em', existingEmail)
    if (existingEmail) {
      return res.status(409).json({ error: "Email already used" });
    }

    const existingUsername = await RegistrationModel.findOne({
      username,
    });
    if (existingUsername) {
      return res.status(409).json({ error: "Username already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await RegistrationModel.create({
        name,
        username,
        email,
        password: hashedPassword,
      });
      const { password: omit, ...userData } = newUser._doc;
      return res.status(201).send({ message: "User created", userData });
    } catch (err) {
      console.error("err on register", err);
      return res.status(500).send({ error: err });
    }
  } else {
    return res.status(400).send({ error: "All the fields are required" });
  }
};
loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let userData = await RegistrationModel.find({ email });

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
};

module.exports = { loginUser, registerUser };
