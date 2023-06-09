import {
  Grid,
  Image,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import ThreedotSvg from "../../Icon/threedotSvg";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProfileBox = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  const [userData, setUserData] = useState({
    profilePicture:
      "https://cdn.landesa.org/wp-content/uploads/default-user-image.png",
    name: "Name",
    username: "username",
  });

  useEffect(() => {
    const renderUserData = async () => {
      let userDetails = await getUserDetails();

      if (userData) {
        setUserData({
          ...userData,
          name: userDetails.name,
          username: userDetails.username,
          profilePicture: userDetails.profilePicture,
        });
      }
    };

    renderUserData();
  }, []);

  const getUserDetails = async () => {
    const GET_USERDETAILS_URL = `${BASE_URL}/user/user-details`;
    let token = localStorage.getItem("token") || "";
    if (token) {
      token = token.replaceAll('"', "");
      let res = await axios.get(GET_USERDETAILS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    }else {
      navigate('/signup');
    }
    return null;
  };

  const profileImg = {
    width: "80%",
    borderRadius: "50%",
  };

  const profileStyle = {
    cursor: "pointer",
  };

  const showProfileBox = useBreakpointValue([
    false,
    false,
    false,
    false,
    true,
    true,
  ]);

  if (showProfileBox) {
    return (
      <Grid
        h="66px"
        w="270px"
        pl="10px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        style={profileStyle}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Image style={profileImg} src={userData.profilePicture} alt="" />
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
  }
};
export default ProfileBox;
