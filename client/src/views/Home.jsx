import { GridItem, Grid, useBreakpointValue } from "@chakra-ui/react";
import SideBar from "../Components/Common/SidebarFolder/Sidebar";
import HomeCenterFeed from "../Components/HomeFeed/HomeFeed";
import HomeRightFeed from "../Components/HomeRightFeed/HomeRightFeed";
import { useEffect } from "react";
import { initializeUser } from "../Redux/Reducers/user.reducer.js";
import { useDispatch} from 'react-redux';


const Home = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(initializeUser());
  },[]);
  const hideComponent = useBreakpointValue({base: true, lg: false});

  return (
    <Grid templateColumns="repeat(18, 1fr)" gap={4}>
      <GridItem colSpan={4}>
        <SideBar />
      </GridItem>
      <GridItem  colSpan={hideComponent ? 14: 9}>
        <HomeCenterFeed />
      </GridItem>
      <GridItem colSpan={5} display={hideComponent ? 'none': 'block'}>
        <HomeRightFeed />
      </GridItem>
    </Grid>
  );
};

export default Home;
