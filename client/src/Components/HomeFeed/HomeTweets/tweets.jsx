import { HStack, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import style from "./tweet.module.css";
import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
const Tweet = ({ tweetInfo }) => {
  const { name, username, userProfilePic, content, time, imageUrl } = tweetInfo;

  console.log(username);
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
      <GridItem rowSpan={6} colSpan={9}>
        {/* here how i can change the rowSpan height depends on the content size, something like auto. maximum 
        rowSpan 6, if content length exceeds that i want to show see more option */}
        {content}
      </GridItem>
      <GridItem rowSpan={18} colSpan={9} bg="papayawhip"></GridItem>
      <GridItem rowSpan={3} colSpan={9} bg="papayawhip"></GridItem>
    </Grid>
  );
};
export default Tweet;
