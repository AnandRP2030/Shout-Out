const bcrypt = require("bcrypt");
const RegistrationModel = require("../models/user.model");
const JWT_SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  const existingEmail = await RegistrationModel.findOne({
    email,
  });
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
    console.log('userData =>',userData);
    return res.status(201).send({ message: "User created", userData });
  } catch (err) {
    console.error("err on register", err);
    return res.status(500).send({ error: err });
  }
};


loginUser = async (req, res) => {
 
  try {
    const { email, password } = req.body;
    //can't find password here its hashed on the registration time
    let userData = await RegistrationModel.find({ email });

    if (userData.length == 0) {
      console.log("empty user data => ", userData);
      return res.status(404).send({ error: "email or password is wrong" });
    }
    // check passwords
    const isPasswordValid = await bcrypt.compare(password, userData[0].password);

    if (!isPasswordValid) {
      return res.status(401).send({ error: "Password is not valid" });
    }

    console.log('usr ', userData[0])
    //generate token
    const token = jwt.sign(
      {

        userId: userData[0]._id,
        name: userData[0].name,
        email,
        username: userData[0].username,

      },
      JWT_SECRET_KEY, {expiresIn: '10h'}
    );

    const UserPassingData = {
      name: userData[0].name,
      username: userData[0].username,
    };
    
    return res
      .status(200)
      .send({ message: "Login Successful", UserPassingData, token });
  } catch (error) {
    console.error("error on login router => ", error);
    return res.status(500).send({ error: "Internal Server error" });
  }
};

// getUserData = async (req, res) => {

// }
module.exports = { loginUser, registerUser };
