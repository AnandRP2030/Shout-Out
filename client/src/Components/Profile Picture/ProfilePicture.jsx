import {
  Box,
  Button,
  Center,
  Circle,
  Heading,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import flyTwit from "../../../asset/fly-bird.gif";
import { AiOutlineClose } from "react-icons/ai";
import { useRef } from "react";
import { useState } from "react";
import "./profilePicture.css";
import { useNavigate } from "react-router";

const ProfilePictureComp = ({
  setPicutureBox,
  userDetails,
  setUserDetails,
}) => {
  const toast = useToast();
  const inputRef = useRef(null);
  const [activeFile, setActiveFile] = useState(null);
  const [currentImg, setCurrentImg] = useState(
    "https://pbs.twimg.com/media/FzDNxyTXwAcuR1x?format=png&name=360x360"
  );
  const [btnContent, setBtnContent] = useState("Select Profile Picture");
  const handleBtnClick = () => {
    if (btnContent === "Select Profile Picture") {
      inputRef.current.click();
      return;
    }
    if (activeFile) {
      confirmProfilePicture();
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      setCurrentImg(event.target.result);
      setBtnContent("Confirm Profile Picture");
    };

    if (file) {
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
        setActiveFile(file);
      } else {
        showToast("Select Image file");
        e.target.value = null;
      }
    }
  };

  const confirmProfilePicture = () => {
    const API_BASE_URL = "https://api.cloudinary.com/v1_1/dpl5bxxv5";

    const data = new FormData();
    data.append("file", activeFile);
    data.append("upload_preset", "shout-image-preset");
    data.append("cloud_name", "dpl5bxxv5");

    fetch(`${API_BASE_URL}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetails({
          ...userDetails,
          profilePicture: data.secure_url,
        });
        setPicutureBox(false);
        showToast("Profile Picture Confirmed");
      })
      .catch((err) => {
        console.log(err, "error on upload profile picture");
        showToast("Error: Try after some time...");
      });
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

  return (
    <Box
      className="pictureContainer"
      w={["80%", "70%", "55%", "50%", "45%"]}
      height={["600px"]}
    >
      <Center>
        <Image w="50px" src={flyTwit} alt="logo" />
      </Center>
      <Box className="profileHeading">
        <Box>
          <Heading>Pick a Profile Picture</Heading>
          <Text color="#67737f">Have a favorite selfie? Upload it now.</Text>
        </Box>
        <Icon
          onClick={() => setPicutureBox(false)}
          color="#fff"
          as={AiOutlineClose}
          boxSize={8}
        />
      </Box>
      <Center mt="10%">
        <Circle w="200px" h="200px" borderRadius="50%" overflow="hidden">
          <Input
            display="none"
            type="file"
            ref={inputRef}
            onChange={handleChange}
          />
          <Image
            onClick={() => {
              inputRef.current.click();
            }}
            w="100px"
            h="100px"
            className="userImg"
            src={currentImg}
            alt="user-img"
          />
        </Circle>
      </Center>
      <Center mt="10%">
        <Button onClick={handleBtnClick} className="selectPicture">
          {btnContent}
        </Button>
      </Center>
    </Box>
  );
};
export default ProfilePictureComp;
