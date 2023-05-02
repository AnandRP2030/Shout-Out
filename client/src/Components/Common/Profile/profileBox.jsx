import { Grid, Image, GridItem, Text } from "@chakra-ui/react";
import ThreedotSvg from "../../Icon/threedotSvg";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useState } from "react";

const ProfileBox = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [userData, setUserData] = useState({
    img: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg?resize=1200:*",
    name: "Elon Musk",
    username: "@elonmusk",
  });

  useEffect(() => {
    const renderUserData = async () => {
      let token = localStorage.getItem("token");
      let email = localStorage.getItem("user_email");

      if (token && email) {
        let userDetails = await getUserDetails(token, email);
        
        setUserData({
          ...userData,
          name: userDetails.name,
          username: userDetails.username,
        });
      }
    };
    renderUserData();
  }, []);

  const getUserDetails = async (token, email) => {
    if (token.at(0) === '"' && token.at(-1) === '"') {
      token = token.slice(1, -1);
    }

    if (email.at(0) === '"' && email.at(-1) === '"') {
      email = email.slice(1, -1);
    }

    const GET_USERDETAILS_URL = `${BASE_URL}/api/userDetails/${email}/${token}`;

    let res = await axios.get(GET_USERDETAILS_URL);
    return res.data[0];
  };

  const profileImg = {
    width: "90%",
    borderRadius: "50%",
  };

  const profileStyle = {
    cursor: "pointer",
  };

  return (
    <Grid
      h="66px"
      w="250px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={4}
      style={profileStyle}
    >
      <GridItem rowSpan={2} colSpan={1}>
        <Image style={profileImg} src={userData.img} alt="" />
      </GridItem>
      <GridItem colSpan={2} rowSpan={1} ml="10px">
        <Text fontSize="1.3rem" as="b">
          {userData.name}
        </Text>
      </GridItem>
      <GridItem colSpan={1} rowSpan={2} mt="18px" ml="5px">
        <ThreedotSvg />
      </GridItem>

      <GridItem colSpan={2} rowSpan={1} ml="10px">
        <Text fontSize="1.1rem" as="i" color="gray">
          {userData.username}
        </Text>
      </GridItem>
    </Grid>
  );
};
export default ProfileBox;
