import { Grid, Image, GridItem, Text } from "@chakra-ui/react";
import ThreedotSvg from "../../Icon/threedotSvg";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import axios from "axios";
const ProfileBox = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [userData, setUserData] = useState({
    img: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg?resize=1200:*",
    name: "Elon Musk",
    username: "@elonmusk",
  });

  useEffect(() => {
    const renderUserData = async () => {
      let userDetails = await getUserDetails();
      
      setUserData({
        ...userData,
        name: userDetails.name,
        username: userDetails.username,
      });
    };

    renderUserData();
  }, []);

  const getUserDetails = async () => {
    const GET_USERDETAILS_URL = `${BASE_URL}/user/user-details`;
    let token = localStorage.getItem("token");
    token = token.replaceAll('"', "");
    let res = await axios.get(GET_USERDETAILS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
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
