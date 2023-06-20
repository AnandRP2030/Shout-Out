import {
  Box,
  Button,
  Center,
  Circle,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import flyTwit from "../../../asset/fly-bird.gif";
import "./profilePicture.css";
import { AiOutlineClose } from "react-icons/ai";

const ProfilePictureComp = ({setPicutureBox}) => {
  return (
    <Box
      className="pictureContainer"
      w={["80%", "70%", "55%", "50%", "45%"]}
      height={["600px"]}
    >
      <Center>
        <Image w="50px" src={flyTwit} alt="logo" />
      </Center>
      <Box className='profileHeading'>
        <Box>
          <Heading>Pick a Profile Picture</Heading>
          <Text color="#67737f">Have a favorite selfie? Upload it now.</Text>
        </Box>
        <Icon onClick={() => setPicutureBox(false)} color='#fff' as={AiOutlineClose} boxSize={8} />
      </Box>
      <Center mt="10%">
        <Circle>
          <Image
            className="userImg"
            src="https://pbs.twimg.com/media/FzDNxyTXwAcuR1x?format=png&name=360x360"
            alt="user-img"
          />
        </Circle>
      </Center>
      <Center mt="10%">
        <Button className="selectPicture"> Select Profile Picture</Button>
      </Center>
    </Box>
  );
};
export default ProfilePictureComp;
