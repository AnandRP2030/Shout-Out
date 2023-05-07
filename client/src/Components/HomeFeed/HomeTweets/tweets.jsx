import { HStack, Grid, GridItem, Image, Text, grid } from "@chakra-ui/react";
import style from "./tweet.module.css";
import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import { useState } from "react";

const Tweet = ({ tweetInfo }) => {
  let { name, username, userProfilePic, content, time, imageUrl } = tweetInfo;
  if (content.length > 140)content = content.substring(0, 220);
  let gridHeight = 6;
  if (content.length < 220)gridHeight = 4;
  else if (content.length < 100)gridHeight = 2;


  return (
    <Grid
      h="auto"
      templateRows="repeat(30, 1fr)"
      templateColumns="repeat(10, 1fr)"
      gap={4}
      className={style.tweetBox}
    >
      <GridItem className={style.userProfilePicBox} rowSpan={30} colSpan={1}>
        <Image
          className={style.userProfilePic}
          src={userProfilePic}
          alt="userProfilePic"
        />
      </GridItem>
      <GridItem rowSpan={3} colSpan={9}>
        <HStack>
          <Text> {name}</Text>
          <TwitterBlueSvg />
          <Text>@{username}</Text>
          <Text> {time} </Text>
        </HStack>
      </GridItem>
      <GridItem rowSpan={gridHeight} colSpan={9}>
       <Text className={style.textContent}>
       {content}
       </Text>
      </GridItem>
      <GridItem rowSpan={18} colSpan={9} bg="papayawhip">
        
      </GridItem>
      <GridItem rowSpan={3} colSpan={9} bg="papayawhip"></GridItem>
    </Grid>
  );
};
export default Tweet;
