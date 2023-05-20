import { GridItem, Grid } from "@chakra-ui/react";
import SideBar from "../Components/Common/SidebarFolder/Sidebar";
import HomeCenterFeed from "../Components/HomeFeed/HomeFeed";
import HomeRightFeed from "../Components/HomeRightFeed/HomeRightFeed";
import { useEffect,useState } from "react";

const Home = () => {
 
  return (
    <Grid templateColumns="repeat(18, 1fr)" gap={4}>
      <GridItem colSpan={4}>
        <SideBar />
      </GridItem>
      <GridItem colSpan={9}>
        <HomeCenterFeed />
      </GridItem>
      <GridItem colSpan={5}>
        <HomeRightFeed />
      </GridItem>
    </Grid>
  );
};

export default Home;

// <GridItem colSpan={4}>
// <Skeleton isLoaded={mounted}>
//   <SideBar />
// </Skeleton>
// </GridItem>
