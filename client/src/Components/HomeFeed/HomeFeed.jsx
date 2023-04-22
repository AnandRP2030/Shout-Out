import { Box, Text } from "@chakra-ui/react";
import HomeFeedHeader from "./HomeFeedComponents/HomeFeedHeader";
const HomeCenterFeed = () => {

    const homeCenterStyle = {
        borderLeft: '1px solid #2d3e4f',
        borderRight: '1px solid #2d3e4f'
    }

    return (
        <Box pt='20px' h='1000px' color='#fff'  style={homeCenterStyle} p={10}>
            <HomeFeedHeader/>
        </Box>  
    )
}
export default HomeCenterFeed;