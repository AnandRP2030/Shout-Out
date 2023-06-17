import { Box } from "@chakra-ui/react";
import { Center, Image, Button, Link, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { VStack, FormControl, Input, Spacer, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { useState } from "react";
import flyTwit from "../../../asset/fly-bird.gif";
import { useToast } from "@chakra-ui/react";
import "./signup.css";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const formStyle = {
    boxShadow:
      "rgb(41, 168, 223) 0px 0px 11px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
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

  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, username, email, password } = userDetails;
    if ((name, username && email && password)) {
      registerUser(userDetails);
    } else {
      alert("Please enter all the fields");
    }
  };

  const registerUser = async ({
    name,
    username,
    email,
    password,
    profilePicture,
  }) => {
    const REGISTRATION_URL = `${BASE_URL}/user/register`;
    if (!profilePicture) {
      profilePicture =
        "https://t4.ftcdn.net/jpg/04/60/03/13/360_F_460031310_ObbCLA1tKrqjsHa7je6G6BSa7iAYBANP.jpg";
    }

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
      let data = await res.json();

      setUserDetails({
        name: "",
        username: "",
        email: "",
        password: "",
        profilePicture: "",
      });
      toast({
        position: "top-center",
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            <Text textAlign="center" fontSize="1.2rem">
              {" "}
              Registration Completed.{" "}
            </Text>
          </Box>
        ),
      });

      setTimeout(() => {
        navigate("/login");
      }, 1550);
    } else if (res.status === 409) {
      let data = await res.json();
      alert(data.error);
    } else {
      alert(res.status);
      console.log("Email or username already use");
    }
  };

  return (
    <Center bgColor="#15202b" m="auto" h="auto" pt="50px" pb="200px" w="100%">
      <Box
        style={formStyle}
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
              <Button w="100%" className="authBtns" >
                <Icon as={FcGoogle} fontSize="2xl" mr="10px" /> Sign up with
                Google
              </Button>
            </Link>

            <Spacer />
            <Button w="100%"  className="authBtns">
              {" "}
              <Icon as={RxGithubLogo} fontSize="2xl" mr="10px" />
              Sign up with Github
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
              type="text"
              placeholder="Name"
              mt="20px"
              name="name"
              value={userDetails.name}
              onChange={handleChanges}
            />

            <Input
              style={userInputStyle}
              type="text"
              placeholder="Username"
              mt="20px"
              name="username"
              value={userDetails.username}
              onChange={handleChanges}
            />
            <Spacer />
            <Input
              style={userInputStyle}
              type="text"
              placeholder="Profile Picture Link (Optional)"
              mt="20px"
              value={userDetails.profilePicture}
              name="profilePicture"
              onChange={handleChanges}
            />
            <Spacer />
            <Input
              style={userInputStyle}
              type="email"
              placeholder="Enter your email"
              mt="20px"
              value={userDetails.email}
              name="email"
              onChange={handleChanges}
            />

            <br />
            <Input
              style={userInputStyle}
              type="password"
              placeholder="Enter your password"
              mt="20px"
              name="password"
              value={userDetails.password}
              onChange={handleChanges}
            />

            <Input
              color="white"
              className="signupBtn"
              w="100%"
              mt="20px"
              mb='20px'
              _hover={{ bg: "red" }}
              backgroundColor="#29a8df"
              value="Get Started"
              type="submit"
            />
          </form>
        </FormControl>
      </Box>
    </Center>
  );
};
export default Signup;
