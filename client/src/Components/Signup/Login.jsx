import { Box } from "@chakra-ui/react";
import "./signup.css";
import {
  HStack,
  Center,
  Image,
  Button,
  Link,
  FormLabel,
  Icon,
} from "@chakra-ui/react";

import { useNavigate } from "react-router";
import { VStack, FormControl, Input, Spacer, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { useState, useEffect } from "react";
import flyTwit from "../../../asset/fly-bird.gif";

const Login = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   let token = JSON.parse(localStorage.getItem("token"));
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const formStyle = {
    boxShadow:
      "rgb(41, 168, 223) 0px 0px 11px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  };

  const btnStyle = {
    borderRadius: "100px",
    width: "100%",
    height: "30px",
    paddingLeft: "20px",
    boxSizing: "border-box",
    cursor: "pointer",
  };

  const userInputStyle = {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: "100px",
    width: "100%",
    letterSpacing: "2px",
    height: "30px",
    paddingLeft: "20px",
    boxSizing: "border-box",
  };

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const { email, password } = userData;

    if (email && password) {
      validateUser(userData);

      setUserData({
        email: "",
        password: "",
      });
    } else {
      console.log("email and password is required");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validateUser = async ({ email, password }) => {
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
    
   
    if (res.status === 200) {
      let data = await res.json();
      console.log('res data', data);

      const { username, name } = data.UserPassingData;
      alert(`Welocme back ${name}`);
      const setToken = () => {
        localStorage.setItem("token", JSON.stringify(data.token));
        redirectHome()
      }
      function redirectHome () {
        console.log('rrrr')
        navigate('/')
      }

      setToken()
    }else {
      let output = await res.json();
      alert(output.error);

    }
  };

  return (
    <Center bgColor="#15202b" m="auto" h="auto" pt="50px" pb="200px" w="100%">
      <Box
        style={formStyle}
        w="25%"
        h="auto"
        className="signupForm"
        padding="1% 2% 1%"
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
          <Text fontSize=".8rem" color="gray">
            Don't you have an account ?
            <Link href="/signup" color="green">
              {" "}
              Signup{" "}
            </Link>
          </Text>
          <VStack w="100%" mt="20px" p={1}>
            <Link color="teal.500" w="100%">
              <Button w="100%" className="signUpbtn" style={btnStyle}>
                <Icon as={FcGoogle} fontSize="2xl" mr="10px" /> Log in with
                Google
              </Button>
            </Link>

            <Spacer />
            <Button w="100%" style={btnStyle} className="signUpbtn">
              {" "}
              <Icon as={RxGithubLogo} fontSize="2xl" mr="10px" />
              Log in with Github
            </Button>
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
            <Input
              style={userInputStyle}
              name="email"
              value={userData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              mt="20px"
            />
            <Spacer />

            <Input
              style={userInputStyle}
              type="password"
              onChange={handleChange}
              value={userData.password}
              name="password"
              placeholder="Enter your password"
              mt="20px"
            />

            <Input
              color="white"
              style={btnStyle}
              w="100%"
              mt="50px"
              type="submit"
              _hover={{ bg: "red" }}
              backgroundColor="#29a8df"
              value="Login"
            />
          </form>
        </FormControl>
      </Box>
    </Center>
  );
};
export default Login;
