import { Center, Box, Image, Button, Link, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { VStack, FormControl, Input, Spacer, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { useState } from "react";
import flyTwit from "../../../asset/fly-bird.gif";
import { useToast } from "@chakra-ui/react";
import BottomBtns from "../mobileButtons/bottomBtns";
import { useBreakpointValue } from "@chakra-ui/react";
import ProfilePictureComp from "../Profile Picture/ProfilePicture";
import { auth, provider } from "./firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
import "./signup.css";

const Signup = () => {
  const [isProgress, setIsProgress] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [pictureBox, setPicutureBox] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profilePicture:
      "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
  });

  const [warnings, setWarnings] = useState({
    nameWarning: "Name should have at least 3 characters",
    usernameWarning: "Username should have at least 3 characters",
    emailWarning: "Email should be valid format",
    passwordWarning: "Password should be at least 6 digits.",
  });

  const [valid, setValid] = useState({
    nameValid: true,
    usernameValid: true,
    emailValid: true,
    passwordValid: true,
  });

  const signupWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      const name = data.user.displayName;
      const email = data.user.email;
      const profilePicture = data.user.photoURL;
      if (email) {
        generateData(name, email, profilePicture);
      }
    });
  };

  const generateData = (name, email, profilePicture) => {
    const firstName = name.split(" ")[0];
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const username = `${firstName}${randomNumber}`;

    const userGoogleDetails = {
      name,
      username,
      email,
      password: email,
      profilePicture,
    };

    registerUser(userGoogleDetails);
  };

  const loginUser = async ({ email, password }) => {
    if (!email || !password) {
      console.log(" email or password is empty");
      return;
    }
    const LOGIN_URL = `${BASE_URL}/user/login`;

    let res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    setUserDetails({
      name: "",
      username: "",
      email: "",
      password: "",
      profilePicture: "",
    });

    setIsProgress(true);
    if (res.status === 200) {
      let data = await res.json();
      const { username, name } = data.UserPassingData;
      showToast(`Welcome ${name}`);
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/");
    } else {
      let output = await res.json();
      const { error } = output;
      showToast(error);
    }
  };

  const showToast = (msg) => {
    toast({
      position: "top-center",
      render: () => (
        <Box color="white" p={3} bg="blue.500">
          <Text textAlign="center" fontSize="1.2rem">
            {" "}
            {msg}
          </Text>
        </Box>
      ),
    });
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataIsValid = validateFormData(userDetails);
    if (dataIsValid) {
      registerUser(userDetails);
    }
  };

  const validateFormData = (userDetails) => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const usernameRegex = /^[A-Za-z0-9]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { name, username, email, password } = userDetails;

    const passed = {
      namePassed: true,
      usernamePassed: true,
      emailPassed: true,
      passwordPassed: true,
    };

    let { namePassed, usernamePassed, emailPassed, passwordPassed } = passed;

    if (name === "" || !nameRegex.test(name)) {
      namePassed = false;
    }

    if (username === "" || !usernameRegex.test(username)) {
      usernamePassed = false;
    }

    if (email === "" || !emailRegex.test(email)) {
      emailPassed = false;
    }

    if (password.length < 6) {
      passwordPassed = false;
    }

    setValid({
      ...valid,
      nameValid: namePassed,
      usernameValid: usernamePassed,
      emailValid: emailPassed,
      passwordValid: passwordPassed,
    });

    if (namePassed && usernamePassed && passwordPassed && emailPassed) {
      return true;
    }

    return false;
  };

  const registerUser = async ({
    name,
    username,
    email,
    password,
    profilePicture,
  }) => {
    setIsProgress(true);
    const REGISTRATION_URL = `${BASE_URL}/user/register`;

    let res = await fetch(REGISTRATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        profilePicture,
      }),
    });

    if (res.status === 201) {
      await res.json();

      loginUser({ email, password });
    } else if (res.status === 409) {
      let data = await res.json();
      showToast(data.error);
    } else {
      showToast(res.status);
    }
  };

  const bottomBtnsOn = useBreakpointValue([true, false]);

  return (
    <>
      <Center bgColor="#15202b" m="auto" h="auto" pt="50px" pb="200px" w="100%">
        {pictureBox ? (
          <ProfilePictureComp
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            setPicutureBox={setPicutureBox}
          />
        ) : (
          <Box
            w={[320, 400]}
            p={6}
            pb={8}
            h="auto"
            className="signupForm"
            color="#fff"
          >
            <Box>
              <Center>
                <Image w="50px" src={flyTwit} alt="logo" />
              </Center>
              <Text fontSize="3xl" as="b">
                {" "}
                Get Started
              </Text>
              <Text fontSize="1rem" color="gray">
                already have an account ?
                <Link fontSize="1rem" href="/login" color="green">
                  {" "}
                  Login{" "}
                </Link>
              </Text>
              <VStack w="100%" mt="20px" p={1}>
                <Link color="teal.500" w="100%">
                  <Button
                    onClick={signupWithGoogle}
                    w="100%"
                    className="authBtns"
                  >
                    <Icon as={FcGoogle} fontSize="2xl" mr="10px" /> Sign up with
                    Google
                  </Button>
                </Link>
              </VStack>
            </Box>
            <Box w="100%" margin="auto" mt="20px">
              <Box
                w="169px"
                m="auto"
                bg="#15202b"
                fontSize=".8rem"
                color="#998b8b"
                pos="relative"
                top="19px"
              >
                <Text textAlign="center"> Or Sign up with Email</Text>
              </Box>
              <hr style={{ borderColor: "#15202b" }} />
            </Box>
            <FormControl h="auto" mt="20px">
              <form onSubmit={handleSubmit}>
                <Box mt="10px">
                  <Text
                    display={valid.nameValid === true ? "none" : "block"}
                    color="red"
                  >
                    {" "}
                    {warnings.nameWarning}
                  </Text>
                </Box>
                <Input
                  className="inputStyle"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleChanges}
                />
                <Box mt="10px">
                  <Text
                    color="red"
                    display={valid.usernameValid === true ? "none" : "block"}
                  >
                    {warnings.usernameWarning}
                  </Text>
                </Box>
                <Input
                  className="inputStyle"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={userDetails.username}
                  onChange={handleChanges}
                />
                <Box mt="10px">
                  <Text
                    color="red"
                    display={valid.emailValid === true ? "none" : "block"}
                  >
                    {warnings.emailWarning}
                  </Text>
                </Box>
                <Input
                  className="inputStyle"
                  type="text"
                  placeholder="Enter your email"
                  value={userDetails.email}
                  name="email"
                  onChange={handleChanges}
                />

                <Box mt="10px">
                  <Text
                    color="red"
                    display={valid.passwordValid === true ? "none" : "block"}
                  >
                    {warnings.passwordWarning}
                  </Text>
                </Box>
                <Input
                  className="inputStyle"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleChanges}
                />

                <Input
                  mt="20px"
                  className="pictureBtn inputStyle"
                  type="button"
                  value="Select Profile Picture"
                  name="password"
                  onClick={() => {
                    setPicutureBox(!pictureBox);
                  }}
                  onChange={handleChanges}
                />

                <Input
                  color="white"
                  className="signupBtn"
                  w="100%"
                  mt="20px"
                  mb="20px"
                  _hover={{ bg: "red" }}
                  backgroundColor="#29a8df"
                  value="Get Started"
                  type="submit"
                  display={isProgress ? "none" : "block"}
                />

                <Button
                  display={!isProgress ? "none" : "block"}
                  w="100%"
                  mt="50px"
                  className="signupBtn"
                  backgroundColor="#29a8df"
                  isLoading={isProgress}
                  colorScheme="blue"
                  loadingText=""
                  pl="50%"
                >
                  Login
                </Button>
              </form>
            </FormControl>
          </Box>
        )}
      </Center>
      {bottomBtnsOn && <BottomBtns />}
    </>
  );
};
export default Signup;
