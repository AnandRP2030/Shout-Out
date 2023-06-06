import { GridItem, Grid } from "@chakra-ui/react";
import SideBar from "../Components/Common/SidebarFolder/Sidebar";
import HomeCenterFeed from "../Components/HomeFeed/HomeFeed";
import HomeRightFeed from "../Components/HomeRightFeed/HomeRightFeed";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { initializeUser } from "../Redux/Reducers/user.reducer.js";
import { store } from "../Redux/store";
import {useSelector, useDispatch} from 'react-redux';



const Home = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(initializeUser());
  },[]);
  
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
