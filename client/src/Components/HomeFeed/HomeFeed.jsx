import { Box, Text } from "@chakra-ui/react";
import HomeFeedHeader from "./HomeFeedComponents/HomeFeedHeader";
import HomeTweetInput from "./HomeFeedComponents/HomeTweetInput";
import HomeTweets from "./HomeTweets/home-tweets";
const HomeCenterFeed = () => {
  const homeCenterStyle = {
    borderLeft: "1px solid #2d3e4f",
    borderRight: "1px solid #2d3e4f",
    color: "#fff",
  };

  return (
    <Box style={homeCenterStyle} minHeight="1000px" pt="10px">
      <HomeFeedHeader />
      <HomeTweetInput />
      <HomeTweets />
    </Box>
  );
};
export default HomeCenterFeed;
