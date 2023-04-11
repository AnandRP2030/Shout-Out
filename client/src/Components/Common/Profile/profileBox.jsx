import { Grid, Image, GridItem, Text } from "@chakra-ui/react";
import ThreedotSvg from "../../Icon/threedotSvg";

const ProfileBox = () => {
  const profileImg = {
    width: "90%",
    borderRadius: "50%",
  };

  let userData = {
    img: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg?resize=1200:*",
    name: "Elon Musk",
    username: "@elonmusk",
  };

  const profileStyle = {
    cursor: 'pointer'
  }
    
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
        <Image style={profileImg} src={userData.img}  alt="" />
      </GridItem>
      <GridItem colSpan={2} rowSpan={1}  ml="10px">
        <Text fontSize="1.3rem" as="b">
          {userData.name}
        </Text>
      </GridItem>
      <GridItem colSpan={1} rowSpan={2} mt='18px' ml='5px'>
        <ThreedotSvg />
      </GridItem>

      <GridItem colSpan={2} rowSpan={1}  ml="10px">
        <Text fontSize="1.1rem" as="i" color='gray'>
          {userData.username}
        </Text>
      </GridItem>
     
    </Grid>
  );
};
export default ProfileBox;
