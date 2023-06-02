
const userRouter = require("express").Router()
const {registerUser} = require("../controller/user.controller");
const {loginUser} = require("../controller/user.controller");
const { authenticateUser } = require("../middlewares/auth");


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/", (req, res) => {
  res.send("http://localhost:5000/user is working");
});

userRouter.get("/user-details", authenticateUser, async (req, res) => {
  res.send(req.user);
});


module.exports = userRouter;
