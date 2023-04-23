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
import flyTwit from "../../../asset/fly-bird.gif"

const Login = () => {

  const formStyle = {
     boxShadow: 'rgb(41, 168, 223) 0px 0px 11px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'

  };

  const btnStyle = {
    borderRadius: "100px",
    width: '100%',
    height: "30px",
    paddingLeft: "20px",
    boxSizing: "border-box",
    cursor: "pointer",
   
  };

  const userInputStyle = {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: "100px",
    width: '100%',
    letterSpacing: "2px",
    height: "30px",
    paddingLeft: "20px",
    boxSizing: "border-box"
  };


  
  return (
    <Center bgColor='#15202b' m='auto' h='auto' pt='50px' pb='200px' w='100%' >
  
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
               <Image
                w="50px"
                src={flyTwit}
                alt="logo"
              /> 
              
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
              <Link
                color="teal.500"
                w="100%"
              >
                <Button
                  w="100%"
                  className="signUpbtn"
                  style={btnStyle}
                >
                  <Icon as={FcGoogle} fontSize="2xl" mr="10px" /> Log in with
                  Google
                </Button>
              </Link>

              <Spacer />
              <Button
                w="100%"
        
                style={btnStyle}
                className="signUpbtn"
              >
                {" "}
                <Icon as={RxGithubLogo} fontSize="2xl" mr="10px" />
                Log in with Github
              </Button>
            </VStack>
          </Box>
          <Box w="100%" margin="auto" mt="20px">
            <Box
              w="169px"
              // pl="10px"
              // pr="10px"
              m="auto"
              bg='#15202b'
              fontSize=".8rem"
              color="#998b8b"
              pos="relative"
              top="19px"
            >
              <Text textAlign='center'> Or Sign up with Email</Text>
            </Box>
            <hr style={{ borderColor: "#15202b" }} />
          </Box>
          <FormControl h="auto" mt="20px">
            <Input
              style={userInputStyle}
              type="text"
              placeholder="Username or email"
              mt="20px"
            />
            <Spacer />
           
        
            <Input
              style={userInputStyle}
              type="password"
              placeholder="Enter your password"
              mt="20px"
            />

            <Button
              color="white"
              style={btnStyle}
              w="100%"
              mt="50px"
              type="submit"
              _hover={{ bg: "red" }}
              backgroundColor= "#29a8df"
            >
              {" "}
              GET STARTED{" "}
            </Button>
          </FormControl>
        </Box>
       
    
    </Center>
  );
};
export default Login;