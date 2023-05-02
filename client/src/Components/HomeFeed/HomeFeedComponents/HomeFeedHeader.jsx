import { Grid, GridItem , Text} from "@chakra-ui/react";
import style from "../homeFeed.module.css";
import { useState } from "react";
const HomeFeedHeader = () => {

  const [forYouActive, setForYou] = useState(true);
  
  
  const handleFollowing = () => {
    setForYou(false);
  }

  const handleForyou = () => {
    setForYou(true);
  }
  return (
    <Grid
      h="100px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      borderBottom="1px solid #2d3e4f"
      pb={5}
    >
      <GridItem rowSpan={1} colSpan={6}>
        <Text className={style.cursorPointer} fontSize='1.5rem' as='b' ml='2%'  > Home </Text>
      </GridItem>
      <GridItem className={style.forYouHead} rowSpan={1}  colSpan={3}  onClick={handleForyou}  > 
        <Text className={`${style.cursorPointer}  ${forYouActive ? style.headTextStyle: ''}`}  fontSize='1.2rem' >For you </Text>
      </GridItem>
      <GridItem className={style.forYouHead} rowSpan={1} colSpan={3} fontSize='1rem' margin='auto' onClick={handleFollowing}>
        <Text className={`${style.cursorPointer} ${!forYouActive ? style.headTextStyle: ''}`}  fontSize='1.2rem' >Following</Text>
      </GridItem>
    </Grid>
  );
};

export default HomeFeedHeader;
