import { Grid,Center, GridItem } from "@chakra-ui/react";
import style from "../homeRight.module.css";

const WhatHappening = () => {
  return (
    <Grid
      templateRows="repeat(30, 1fr)"
      templateColumns="repeat(28, 1fr)"
      gap={4}
      id={style.trendingBox}
    >
      <GridItem rowSpan={3} colSpan={25} bg="tomato" >
            
      </GridItem>

      <GridItem rowSpan={5} colSpan={25} bg="tomato" >
            
      </GridItem>
      <GridItem rowSpan={5} colSpan={25} bg="tomato" >

      </GridItem>
      <GridItem rowSpan={5} colSpan={25} bg="tomato" >

      </GridItem>
      <GridItem rowSpan={5} colSpan={25} bg="tomato" >

      </GridItem>
      <GridItem rowSpan={5} colSpan={25} bg="tomato" >

      </GridItem>
    </Grid>
  );
};
export default WhatHappening;
