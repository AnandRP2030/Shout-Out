import { Box } from "@chakra-ui/react";
import { Center, Image, Button, Link, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { VStack, FormControl, Input, Spacer, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { useState } from "react";
import flyTwit from "../../../asset/fly-bird.gif";
import { useToast } from "@chakra-ui/react";
import BottomBtns from "../mobileButtons/bottomBtns";
import { useBreakpointValue } from "@chakra-ui/react";
import { auth, provider } from "./firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
import "./signup.css";

const Login = () => {
  const [valid, setValid] = useState({
    emailValid: true,
    passwordValid: true,
  });
  const [isProgress, setIsProgress] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const signupWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      const email = data.user.email;
      if (email) {
        generateData(email);
      }
    });
  };

  const generateData = (email) => {
    const userGoogleDetails = {
      email,
      password: email,
    };
    loginUser(userGoogleDetails);
  };

  const resetState = () => {
    setUserData({
      email: "",
      password: "",
    });
    setValid({
      emailValid: true,
      passwordValid: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = validateFormData(userData);

    if (isValid) {
      loginUser(userData);
      resetState();
    }
  };

  const validateFormData = (userData) => {
    const { email, password } = userData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email) && password && password.length >= 6) {
      return true;
    }
    resetState();
    return false;
  };

  const toastMsg = (msg, color) => {
    toast({
      position: "top-center",
      render: () => (
        <Box color="white" p={3} bg={`${color}.500`}>
          <Text textAlign="center" fontSize="1.2rem">
            {" "}
            {msg}
          </Text>
        </Box>
      ),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const loginUser = async ({ email, password }) => {
    if (!email || !password) {
      console.log(" email or password is empty");
      return;
    }
    setIsProgress(true);
    const LOGIN_URL = `${BASE_URL}/user/login`;
    try{
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
      if (res.status === 200) {
        let data = await res.json();
        const { username, name } = data.UserPassingData;
        toastMsg(`Welcome ${name}`, "blue");
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/");
      } else {
        let output = await res.json();
        const { error } = output;
        toastMsg(error, "red");
        resetState();
      }

    }catch(err) {
      console.log(err);
    }finally{
      setIsProgress(false);
    }
  };

  const bottomBtnsOn = useBreakpointValue([true, false]);

  return (
    <>
      <Center bgColor="#15202b" m="auto" h="auto" pt="50px" pb="200px" w="100%">
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
              Welcome Back
            </Text>
            <Text fontSize="1rem" color="gray">
              Don't you have an account ?
              <Link fontSize="1rem" href="/signup" color="green">
                {" "}
                Signup{" "}
              </Link>
            </Text>
            <VStack w="100%" mt="20px" p={1}>
              <Link color="teal.500" w="100%">
                <Button
                  w="100%"
                  className="authBtns"
                  onClick={signupWithGoogle}
                >
                  <Icon as={FcGoogle} fontSize="2xl" mr="10px" /> Log in with
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
          <FormControl h="auto" mt="40px">
            <form onSubmit={handleSubmit}>
              <Box mt="10px">
                <Text
                  display={valid.emailValid === true ? "none" : "block"}
                  color="red"
                >
                  Email should be valid format{" "}
                </Text>
              </Box>
              <Input
                className="inputStyle"
                name="email"
                value={userData.email}
                onChange={handleChange}
                type="text"
                placeholder="Enter your email"
              />
              <Spacer />
              <Box mt="20px">
                <Text
                  display={valid.passwordValid === true ? "none" : "block"}
                  color="red"
                >
                  {" "}
                  Password should be at least 6 digits.
                </Text>
              </Box>

              <Input
                className="inputStyle"
                type="password"
                onChange={handleChange}
                value={userData.password}
                name="password"
                placeholder="Enter your password"
              />

              <Input
                className="signupBtn"
                color="white"
                w="100%"
                mt="50px"
                type="submit"
                _hover={{ bg: "red" }}
                backgroundColor="#29a8df"
                value="Login"
                display={isProgress ? "none": "block"}
              />

              <Button
                display={!isProgress ? "none": "block"}
                w="100%"
                mt="50px"
                className="signupBtn"
                backgroundColor="#29a8df"
                isLoading={isProgress}
                colorScheme='blue'
                loadingText=""
                pl='50%'
              >
                Login
              </Button>
            </form>
          </FormControl>
        </Box>
      </Center>
      {bottomBtnsOn && <BottomBtns />}
    </>
  );
};
export { Login };
