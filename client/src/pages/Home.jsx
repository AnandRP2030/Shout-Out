import { HStack, Heading, Image, Box, GridItem, Grid } from "@chakra-ui/react";
import SideBar from "../Components/Common/SidebarFolder/Sidebar";
import HomeCenterFeed from "../Components/HomeFeed/HomeFeed";
import HomeRightFeed from "../Components/HomeRightFeed/HomeRightFeed";
import { useEffect } from "react";

const Home = () => {

  return (
    <Grid
      h="auto"
      templateColumns="repeat(20, 1fr)"
      gap={4}
     
    >
      <GridItem  colSpan={4} >
        <SideBar />
      </GridItem>
      <GridItem  colSpan={11}>
        <HomeCenterFeed />
      </GridItem>
      <GridItem  colSpan={5}>
        <HomeRightFeed/>
      </GridItem>
    </Grid>
  );
};

export default Home;
