import { GridItem, Grid, useBreakpointValue } from "@chakra-ui/react";
import SideBar from "../Components/Common/SidebarFolder/Sidebar";
import HomeCenterFeed from "../Components/HomeFeed/HomeFeed";
import HomeRightFeed from "../Components/HomeRightFeed/HomeRightFeed";
import { useEffect } from "react";
import { initializeUser } from "../Redux/Reducers/user.reducer.js";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const hideComponent = useBreakpointValue({ base: true, xl: false });
  const mobileSize = useBreakpointValue([true, false, false, false, false]);

  return (
    <Grid templateColumns="repeat(18, 1fr)" gap={4}>
      <GridItem
        display={mobileSize ? "none" : "block"}
        colSpan={!hideComponent ? 4 : 2}
      >
        <SideBar />
      </GridItem>
      <GridItem colSpan={mobileSize ? 18 : hideComponent ? 16 : 9}>
        <HomeCenterFeed />
      </GridItem>
      <GridItem
        colSpan={!hideComponent ? 5 : 1}
        display={hideComponent ? "none" : "block"}
      >
        <HomeRightFeed />
      </GridItem>
    </Grid>
  );
};

export default Home;
