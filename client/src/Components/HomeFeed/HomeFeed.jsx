import { Box, Text } from "@chakra-ui/react";
import HomeFeedHeader from "./HomeFeedComponents/HomeFeedHeader";
import HomeTweetInput from "./HomeFeedComponents/HomeTweetInput";


const HomeCenterFeed = () => {

    const homeCenterStyle = {
        borderLeft: '1px solid #2d3e4f',
        borderRight: '1px solid #2d3e4f'
    }

    return (
        <Box h='1000px' color='#fff' style={homeCenterStyle} pt='10px' >
            <HomeFeedHeader/>
            <HomeTweetInput/>
        </Box>  
    )
}
export default HomeCenterFeed;