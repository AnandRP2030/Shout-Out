import {
  Icon,
  Box,
  HStack,
  Grid,
  GridItem,
  Image,
  Text,
  grid,
} from "@chakra-ui/react";
import style from "./tweet.module.css";
import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import { useState } from "react";
import { FaRegComment, IoCompassSharp } from "react-icons/all";
import { AiOutlineRetweet } from "react-icons/all";
import { AiOutlineHeart } from "react-icons/all";
import { BiBarChart } from "react-icons/all";
import { FaShare } from "react-icons/all";

const Tweet = ({ tweetInfo }) => {
  let {
    content,
    comments,
    imageUrls,
    likes,
    isPrivate,
    retweets,
    totalNoCmts,
    tweetId,
    views,
    videoUrls,
  } = tweetInfo;
  let { username, name, email, userId } = tweetInfo.tweetOwner;

  // console.log(
  //   username,
  //   name,
  //   email,
  //   tweetId,
  //   views,
  //   videoUrls,
  //   userId,
  //   content,
  //   comments,
  //   likes,
  //   isPrivate,
  //   retweets,
  //   totalNoCmts
  // );

  console.log(imageUrls, 'uu')
  if (content.length > 300) content = content.substring(0, 220);
  let gridHeight = 4;
  let len = content.length;
  if (len < 100) gridHeight = 2;
  else if (len < 170) gridHeight = 3;

  return (
    <Grid
      h="auto"
      templateColumns="repeat(10, 1fr)"
      gap={4}
      className={style.tweetBox}
    >
      <GridItem className={style.userProfilePicBox} colSpan={1}>
        <Image
          className={style.userProfilePic}
          src={
            "https://pbs.twimg.com/media/Fw7e1UhXwAMRJFQ?format=jpg&name=medium"
          }
          alt="userProfilePic"
        />
      </GridItem>
      <GridItem colSpan={9} h="auto">
        <GridItem>
          <HStack>
            <Text className={style.nameText}> {name}</Text>
            <Box>
              <TwitterBlueSvg height="25px" width="25px" />
            </Box>
            <Text className={style.usernameText}>@{username} ·</Text>
            <Text className={style.timeText}> {"1h"} </Text>
          </HStack>
        </GridItem>
        <GridItem mt={2}>
          <Text className={style.textContent}>{content}</Text>
        </GridItem>
        {imageUrls && imageUrls.length > 0 ? (
          <GridItem>
            <Image
              className={style.tweetImage}
              src={imageUrls[0]}
              objectFit="contain"
              alt="content-img"
            />
          </GridItem>
        ) : (
          ""
        )}

        <GridItem mt="20px">
          <HStack className={style.tweetOptions}>
            <HStack>
              <Icon as={FaRegComment} boxSize={5} />
              <Text> {totalNoCmts}</Text>
            </HStack>
            <HStack>
              <Icon as={AiOutlineRetweet} boxSize={5} />
              <Text> {retweets}</Text>
            </HStack>
            <HStack>
              <Icon as={AiOutlineHeart} boxSize={5} />
              <Text> {likes}</Text>
            </HStack>
            <HStack>
              <Icon as={BiBarChart} boxSize={5} />
              <Text> {views}</Text>
            </HStack>
            <HStack>
              <Icon as={FaShare} boxSize={5} />
            </HStack>
          </HStack>
        </GridItem>
      </GridItem>
    </Grid>
  );
};
export default Tweet;
