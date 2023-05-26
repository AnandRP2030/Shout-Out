import { Box, Text } from "@chakra-ui/react";
import HomeFeedHeader from "./HomeFeedComponents/HomeFeedHeader";
import HomeTweetInput from "./HomeFeedComponents/HomeTweetInput";
import HomeTweets from "./HomeTweets/home-tweets";
import { useState } from "react";
const HomeCenterFeed = () => {

    const homeCenterStyle = {
        borderLeft: '1px solid #2d3e4f',
        borderRight: '1px solid #2d3e4f',
        color:'#fff'
    }

    const [newTweet, setNewTweet] = useState(true);

    return (
        <Box  style={homeCenterStyle} minHeight='1000px' pt='10px' >
            <HomeFeedHeader/>
            <HomeTweetInput newTweet={newTweet} setNewTweet={setNewTweet}/>
            <HomeTweets newTweet={newTweet}/>
        </Box>  
    )
}
export default HomeCenterFeed;