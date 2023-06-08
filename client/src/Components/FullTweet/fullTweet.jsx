import Home from "../../views/Home";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import HomeCenterFeed from "../HomeFeed/HomeFeed";
import HomeRightFeed from "../HomeRightFeed/HomeRightFeed";
import SideBar from "../Common/SidebarFolder/Sidebar";
import HomeFeedHeader from "../HomeFeed/HomeFeedComponents/HomeFeedHeader";
import HomeTweetInput from "../HomeFeed/HomeFeedComponents/HomeTweetInput";
import HomeTweets from "../HomeFeed/HomeTweets/home-tweets";
import { useParams } from "react-router-dom";
import "./fullTweet.css";
import axios from "axios";
import { useEffect, useState } from "react";

const FullTweet = () => {
  const [tweet, setTweet] = useState({});
  useEffect(() => {
    getTweet();
  }, []);

  const { tweetId } = useParams();
  const getTweet = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const GET_TWEET_URL = `${BASE_URL}/user/tweets/${tweetId}`;
    const token = localStorage.getItem("token").replaceAll('"', "");
    const response = await axios.get(GET_TWEET_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { tweets, ownersInfo, tweetsStatus } = response.data;
    
    setTweet(response.data);
  };

  console.log(tweet)

  return (
    <>
      <Grid bgColor="#15202b" templateColumns="repeat(18, 1fr)" gap={4}>
        <GridItem colSpan={4}>
          <SideBar />
        </GridItem>
        <GridItem colSpan={9}>
          <Box
            className="homeCenterStyle"
            color="white"
            minHeight="1000px"
            pt="10px"
          >
            <HomeFeedHeader headerName="Tweet" />
            <HomeTweets tweetIdentity={tweetId}/>
          </Box>
        </GridItem>
        <GridItem colSpan={5}>
          <HomeRightFeed />
        </GridItem>
      </Grid>
    </>
  );
};
export default FullTweet;
