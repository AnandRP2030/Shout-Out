import {
  GridItem,
  Grid,
  Box,
  Skeleton,
  Stack,
  SkeletonCircle,
  SkeletonText,
  HStack,
} from "@chakra-ui/react";
import SideBar from "../Components/Common/SidebarFolder/Sidebar";
import HomeCenterFeed from "../Components/HomeFeed/HomeFeed";
import HomeRightFeed from "../Components/HomeRightFeed/HomeRightFeed";
import { useState, useEffect } from "react";
import HomeSkeleton from "../Components/HomeFeed/HomeFeedComponents/HomeSkeleton";
const Home = () => {
  

  return (
    <Grid h="auto" templateColumns="repeat(20, 1fr)" gap={4}>
      <GridItem colSpan={4}>
        <SideBar />
      </GridItem>
      <GridItem colSpan={11}>
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