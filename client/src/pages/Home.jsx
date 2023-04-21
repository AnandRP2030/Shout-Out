import { HStack, Heading, Image, Box, GridItem, Grid } from "@chakra-ui/react";
import SideBar from "../Components/Common/SidebarFolder/Sidebar";
import HomeCenterFeed from "../Components/HomeFeed/HomeFeed";

const Home = () => {
  return (
    <Grid
      h="200px"
      templateColumns="repeat(12, 1fr)"
      gap={4}
    >
      <GridItem  colSpan={3} >
        <SideBar />
      </GridItem>
      <GridItem  colSpan={6}>
        <HomeCenterFeed />
      </GridItem>
      <GridItem  colSpan={3}>
      </GridItem>
    </Grid>
  );
};

export default Home;
